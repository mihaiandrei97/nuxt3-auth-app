// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications

import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;
// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  __db: Prisma.PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const db = global.__db || new PrismaClient();

if (process.env.NODE_ENV === "development") global.__db = db;

export { db };
