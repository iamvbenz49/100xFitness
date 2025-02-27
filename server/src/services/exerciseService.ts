import { PrismaClient } from "@prisma/client";
import ExerciseInput from "../interfaces/services/ExerciseInput";import { getWorkoutByName } from "./workoutServices";
;
const prisma = new PrismaClient();

export const createExercise = async ({ userId, name, sets }: ExerciseInput) => {
  try {
    if (!userId || !name) {
      throw new Error("Missing required fields: userId, workoutId, or name");
    }
    const forId = await getWorkoutByName(name);
    if(!forId) {
      throw new Error("Cant fetch workout by name");
    }
    const newExercise = await prisma.workoutExercise.create({
      data: {
        workout: { connect: { id: forId.id  } }, 
        user: { connect: { id: userId } },  
        name,
        sets: sets && sets.length > 0 ? { create: sets } : undefined
      },
    });

    return newExercise;
  } catch (error: any) {
    console.error("Error creating exercise:", error);
    throw new Error("Failed to create exercise");
  }
};

export const createWorkout = async ({ userId, name }: { userId: string; name: string }) => {
  try {
    if (!userId || !name) {
      throw new Error("Missing required fields: userId or name");
    }
    
    const newWorkout = await prisma.workout.create({
      data: {
        userId, 
        name,
      },
    });

    return newWorkout;
  } catch (error: any) {
    console.error("Error creating workout:", error);
    throw new Error("Failed to create workout");
  }
};


export const getAllWorkouts = async (userId: string) => {
  try {

    const workouts = await prisma.workout.findMany({
      where: {userId: userId}, 
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    console.log(workouts)
    return workouts;
  } catch (error: any) {
    console.error("Error fetching workouts:", error);
    throw new Error("Failed to fetch workouts");
  }
};