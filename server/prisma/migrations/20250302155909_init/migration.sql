/*
  Warnings:

  - You are about to drop the column `isPersonalBest` on the `SetLog` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SetLog" DROP COLUMN "isPersonalBest";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdAt";
