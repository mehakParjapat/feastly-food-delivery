import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const port = process.env.DB_PORT || process.env.MYSQL_PORT || 3306;
  const user = process.env.DB_USER || process.env.MYSQL_USER;
  const pass = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const name =
    process.env.DB_NAME || process.env.DB_DATABASE || process.env.MYSQL_DATABASE;
  if (host && user && name) {
    process.env.DATABASE_URL = `mysql://${user}:${encodeURIComponent(
      pass
    )}@${host}:${port}/${name}`;
  }
}

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
