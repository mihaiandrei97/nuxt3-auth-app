import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    path: "server-api/auth/v1/refresh_token",
  });
};
