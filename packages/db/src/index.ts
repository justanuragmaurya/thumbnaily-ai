import { PrismaClient } from "../generated/prisma/index.js";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: { url: process.env.DATABASE_URL },
    },
  });
};

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: prismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;