/*
  Warnings:

  - You are about to drop the column `workoutId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the `_WorkoutToWorkoutExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_WorkoutToWorkoutExercise" DROP CONSTRAINT "_WorkoutToWorkoutExercise_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutToWorkoutExercise" DROP CONSTRAINT "_WorkoutToWorkoutExercise_B_fkey";

-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "workoutId";

-- DropTable
DROP TABLE "_WorkoutToWorkoutExercise";

-- CreateTable
CREATE TABLE "WorkoutToExercise" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "WorkoutToExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutToExercise_workoutId_exerciseId_key" ON "WorkoutToExercise"("workoutId", "exerciseId");

-- AddForeignKey
ALTER TABLE "WorkoutToExercise" ADD CONSTRAINT "WorkoutToExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutToExercise" ADD CONSTRAINT "WorkoutToExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
