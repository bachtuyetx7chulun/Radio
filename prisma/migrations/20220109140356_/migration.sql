/*
  Warnings:

  - You are about to drop the column `ipPublic` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `isPlaying` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "ipPublic";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "isPlaying";

-- CreateTable
CREATE TABLE "Play" (
    "id" SERIAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Play_pkey" PRIMARY KEY ("id")
);
