/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_name_key" ON "WorkoutExercise"("name");
