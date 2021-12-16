import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "10m",
  });
}

export function generateRefreshToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "4h",
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
