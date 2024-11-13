-- CreateEnum
CREATE TYPE "Status" AS ENUM ('MEMBER', 'STAR', 'AIDE', 'ADMIN', 'RESPONSABLE', 'MINISTRE', 'PASTEUR', 'ASSISTANT_PASTEUR');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
