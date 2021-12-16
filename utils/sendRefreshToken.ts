import { Response } from "express";
import { setCookie } from "h3";

export const sendRefreshToken = (res: Response, token: string) => {
  setCookie(res, "refresh_token", token, {
    httpOnly: true,
    sameSite: true,
    path: "/server-api/v1/auth",
  });
};
