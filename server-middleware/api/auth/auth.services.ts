import { Prisma } from "@prisma/client";
import { db } from "~~/utils/db";

export const createRefreshToken = (
  refreshTokenPayload: Prisma.RefreshTokenUncheckedCreateInput
) => {
  return db.refreshToken.create({
    data: refreshTokenPayload,
  });
};

export const findRefreshToken = (token: string) => {
  return db.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const deleteRefreshToken = (token: string) => {
  return db.refreshToken.delete({
    where: {
      token,
    },
  });
};
