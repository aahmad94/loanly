import { PrismaClient } from '@prisma/client';

declare global {
  // Allow the global scope to keep the Prisma client reference
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;