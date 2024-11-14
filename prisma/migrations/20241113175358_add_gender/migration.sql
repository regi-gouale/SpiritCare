-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE';
