import { PrismaClient } from "@prisma/client";
import ExerciseInput from "../interfaces/services/ExerciseInput";
import { ObjectId } from "mongodb";
const prisma = new PrismaClient();

export const createExercise = async ({ userId, workoutId, name, sets }: ExerciseInput) => {
  try {
    if (!userId || !name) {
      throw new Error("Missing required fields: userId, workoutId, or name");
    }

    const newExercise = await prisma.workoutExercise.create({
      data: {
        userId: userId,
        name:name,
        sets: sets && sets.length > 0 ? { create: sets } : undefined,
      },
    });

    return newExercise;
  } catch (error: any) {
    console.error("Error creating exercise:", error);
    throw new Error("Failed to create exercise");
  }
};


export const getAllWorkouts = async (userId: string) => {
    try {
      const userObjectId = new ObjectId(userId);
  
      const workouts = await prisma.workout.findMany({
        where: { userId: userObjectId.toString() }, 
        include: {
          exercises: {
            include: {
              sets: true, 
            },
          },
        },
      });
  
      return workouts;
    } catch (error: any) {
      console.error("Error fetching workouts:", error);
      throw new Error("Failed to fetch workouts");
    }
  };
