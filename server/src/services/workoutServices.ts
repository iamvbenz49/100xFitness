import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getUserWorkoutsByUserId = async (userId: string) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: {
          include: {
            exercise: {
              include: {
                SetLog: true, 
              },
            },
          },
        },
      },
    });

    if (!workouts.length) {
      throw new Error("No workouts found for this user.");
    }

    return workouts;
  } catch (error) {
    console.error(`Error fetching workouts for user ${userId}:`, error);
    throw new Error("Failed to retrieve workouts. Please try again later.");
  }
};


export const getUserWorkoutExercises = async (userId: string) => {
  try {
    const exercises = await prisma.workoutExercise.findMany({
      where: { userId },
      include: {
        workouts: {
          include: { workout: true }, 
        } 
      },
    });

    return exercises;
  } catch (error) {
    console.error("Error fetching user workout exercises:", error);
    throw new Error("Failed to fetch workout exercises");
  }
};

export const createWorkout = async (sessionName: string, userId: string, workouts: any) => {
  try {
    if (!workouts || workouts.length === 0) {
      console.log("No valid workout data provided");
      return [];
    }

    console.log("Received workout data:", JSON.stringify(workouts));

    const routine = await prisma.workout.create({
      data: {
        userId: userId,
        name: sessionName,
      },
    });

    for (const workout of workouts) {
      let exercise = await prisma.workoutExercise.findFirst({
        where: {
          userId: userId,
          name: workout.name,
        },
      });


      if (!exercise) {
        exercise = await prisma.workoutExercise.create({
          data: {
            userId: userId,
            name: workout.name,
          },
        });
      }

      const existingLink = await prisma.workoutToExercise.findFirst({
        where: {
          workoutId: routine.id,
          exerciseId: exercise.id,
        },
      });

      if (!existingLink) {
        await prisma.workoutToExercise.create({
          data: {
            workoutId: routine.id,
            exerciseId: exercise.id,
          },
        });
      }

      for (const set of workout.sets) {
        await prisma.setLog.create({
            data: {
                workoutId: routine.id, 
                exerciseId: exercise.id,
                reps: set.reps,
                weight: set.weight,
            },
        });
    }    
    }

    console.log("Workout creation completed successfully");
    return;
  } catch (error: any) {
    console.error("Error creating workout:", error);
    throw new Error("Failed to create workout");
  }
};


export const getUserWorkouts = async (userId: string) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: {
          include: {
            exercise: {
              include: {
                // sets: , // Include sets for each exercise
              },
            },
          },
        },
      },
    });

    return workouts;
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw new Error("Failed to fetch workouts");
  }
};
