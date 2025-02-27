import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWorkoutByName = async ( name: string ) => {
    try {
      if (!name) {
        throw new Error("Missing required fields: userId or name");
      }
  
      const workout = await prisma.workout.findFirst({
        where: {
          name
        },
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
      });
  
      return workout;
    } catch (error: any) {
      console.error("Error fetching workout:", error);
      throw new Error("Failed to fetch workout");
    }
  };
  