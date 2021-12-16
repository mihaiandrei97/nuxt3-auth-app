import express from "express";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { useCookie } from "h3";
import jwt from "jsonwebtoken";

import {
  createUserByEmailAndPassword,
  findUserByEmail,
  findUserById,
} from "../users/users.services";
import { generateTokens } from "~/utils/jwt";
import { sendRefreshToken } from "~~/utils/sendRefreshToken";
import {
  createRefreshToken,
  deleteRefreshToken,
  findRefreshToken,
} from "./auth.services";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(403);
      throw new Error("Email or password is empty.");
    }

    const createUser: Prisma.UserCreateInput = { email, password };

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(403);
      throw new Error("Email already in use.");
    }

    createUser.password = await bcrypt.hash(password, 12);

    const user = await createUserByEmailAndPassword(createUser);

    const { accessToken, refreshToken } = generateTokens(user);

    await createRefreshToken({ token: refreshToken, userId: user.id });

    sendRefreshToken(res, refreshToken);

    res.json({
      accessToken,
    });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(403);
    }
    console.log(error);
    res.status(403).json({ message: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(403);
      throw new Error("Email or password is empty.");
    }

    const createUser: Prisma.UserCreateInput = { email, password };

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      const error = new Error("Invalid login credentials.");
      res.status(403);
      throw error;
    }

    const { accessToken, refreshToken } = generateTokens(existingUser);

    await createRefreshToken({
      token: refreshToken,
      userId: existingUser.id,
    });

    sendRefreshToken(res, refreshToken);

    res.json({
      accessToken,
    });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(403);
    }

    res.status(403).json({ message: error.message });
  }
});

router.post("/refresh_token", async (req, res, next) => {
  try {
    const token = useCookie(req, "refresh_token");
    if (!token) {
      res.status(401);
      throw new Error("Token missing");
    }
    let payload: any = null;
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

    const user = await findUserById(payload.userId);

    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const savedRefreshToken = await findRefreshToken(token);

    if (!savedRefreshToken) {
      res.status(401);
      throw new Error("Not authorized.");
    }

    if (savedRefreshToken.userId !== payload.userId) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await deleteRefreshToken(token);
    await createRefreshToken({ token: refreshToken, userId: payload.userId });

    sendRefreshToken(res, refreshToken);

    res.json({ accessToken });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(401);
    }
    sendRefreshToken(res, "");
    res.status(401).json({ message: error.message });
  }
});

router.post("/logout", async (req, res, next) => {
  const token = useCookie(req, "refresh_token");
  await deleteRefreshToken(token);
  sendRefreshToken(res, "");
  res.status(200);
  res.json({
    data: "success",
  });
});

export default router;
