import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare var global: { prisma: PrismaClient } & typeof globalThis;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
