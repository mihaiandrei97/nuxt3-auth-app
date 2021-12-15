import express from "express";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

import {
  createUserByEmailAndPassword,
  findUserByEmail,
} from "../users/users.services";
import { generateTokens } from "~/utils/jwt";
import { sendRefreshToken } from "~~/utils/sendRefreshToken";

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

export default router;
