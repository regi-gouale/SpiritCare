import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends({
    result: {
      person: {
        fullname: {
          needs: { firstname: true, lastname: true },
          compute(person) {
            return `${person.firstname} ${person.lastname}`;
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
