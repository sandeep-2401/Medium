import { PrismaClient } from "@prisma/client";

// Access the DATABASE_URL secret from Cloudflare Workers
const DATABASE_URL = globalThis.DATABASE_URL as string;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

export default prisma;
