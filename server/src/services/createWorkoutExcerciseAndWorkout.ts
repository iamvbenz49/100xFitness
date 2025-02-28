import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createWorkoutWithExercises = async (
  userId: string,
  name: string,
  exercises: { name: string; sets: { reps: number; weight: number }[] }[]
) => {
  try {
    if (!exercises || exercises.length === 0) {
      throw new Error("Exercises cannot be empty");
    }

    // Create Workout
    const workout = await prisma.workout.create({
      data: {
        userId,
        name,
        exercises: {
          create: exercises.map((exercise) => ({
            userId,
            name: exercise.name,
            sets: {
              create: exercise.sets.map((set) => ({
                reps: set.reps,
                weight: set.weight,
              })),
            },
          })),
        },
      },
      include: {
        exercises: {
          include: { sets: true },
        },
      },
    });

    return workout;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Failed to create workout");
  }
};
