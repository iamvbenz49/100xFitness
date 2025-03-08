import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchWorkouts() {
  try {
    const workouts = await prisma.workout.findMany();
    console.log(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
  } finally {
    await prisma.$disconnect();
  }
}


fetchWorkouts();
