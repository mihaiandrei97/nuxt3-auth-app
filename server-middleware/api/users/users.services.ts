import { Prisma } from "@prisma/client";
import { db } from "~~/utils/db";

export const findUserByEmail = (email) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUserByEmailAndPassword = (user: Prisma.UserCreateInput) => {
  return db.user.create({
    data: user,
  });
};
