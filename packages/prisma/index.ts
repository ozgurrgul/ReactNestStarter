import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
  });

// @ts-ignore
if (process.env.NODE_ENV === "development") global.prisma = prisma;
