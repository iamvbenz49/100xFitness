import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../auth/authenticate";

const sampleRoutes = express.Router();
const prisma = new PrismaClient();

sampleRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 
    const sampleWorkouts = await prisma.workoutExercise.findMany({
      where: { userId },
      select: { id: true, name: true },
      take: 10,
    });

    res.json({ success: true, data: sampleWorkouts });
  } catch (error) {
    console.error("Error fetching sample workouts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default sampleRoutes;
