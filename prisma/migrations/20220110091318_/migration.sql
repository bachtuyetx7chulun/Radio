/*
  Warnings:

  - You are about to drop the column `isActive` on the `Action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "isActive",
ADD COLUMN     "isActived" BOOLEAN NOT NULL DEFAULT false;
