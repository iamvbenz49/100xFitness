import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createWorkoutWithExercises = async ( userId, name, exercises ) => {
  try {
    if(!exercises) {
        return
    }
    const workout = await prisma.workout.create({
      data: {
        userId,
        name,
        exercises: {
          create: exercises.map((exercise: { name: any; sets: { reps: any; weight: any; }[]; }) => ({
            userId,
            name: exercise.name,
            sets: {
              create: exercise.sets.map((set: { reps: any; weight: any; }) => ({
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
