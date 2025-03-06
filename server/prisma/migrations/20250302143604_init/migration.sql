/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Workout` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "WorkoutExercise_name_key";

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workout_name_userId_key" ON "Workout"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_name_userId_key" ON "WorkoutExercise"("name", "userId");
