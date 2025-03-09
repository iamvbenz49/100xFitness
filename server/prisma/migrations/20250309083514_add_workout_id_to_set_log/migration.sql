/*
  Warnings:

  - Added the required column `workoutId` to the `SetLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SetLog" ADD COLUMN     "workoutId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SetLog" ADD CONSTRAINT "SetLog_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
