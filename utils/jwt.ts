import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "30s",
  });
}

export function generateRefreshToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "1d",
  });
}

export function generateTokens(user: User) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
}
