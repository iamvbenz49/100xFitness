-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutId_fkey";

-- CreateTable
CREATE TABLE "_WorkoutToWorkoutExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WorkoutToWorkoutExercise_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_WorkoutToWorkoutExercise_B_index" ON "_WorkoutToWorkoutExercise"("B");

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutExercise" ADD CONSTRAINT "_WorkoutToWorkoutExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutExercise" ADD CONSTRAINT "_WorkoutToWorkoutExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
