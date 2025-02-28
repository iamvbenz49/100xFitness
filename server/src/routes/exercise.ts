import express, { Request, Response } from "express";
import { authenticate } from "../auth/authenticate";
import { createWorkout, getAllWorkouts } from "../services/exerciseService";
import AuthRequest from "../interfaces/auth/AuthRequest"; 
import { createWorkoutWithExercises } from "../services/createWorkoutExcerciseAndWorkout";
const exerciseRoutes = express.Router();


exerciseRoutes.post("/exercise", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(403).json({ message: "User not authenticated" });
      return
    }

    const { name, exercises } = req.body;
    
    if (!name ||  exercises.length === 0) {
      console.log("Workout name and exercises are required")
      res.status(400).json({ message: "Workout name and exercises are required" });
      return
    }

    console.log("Received Workout:", name, exercises);

    const workout = await createWorkoutWithExercises(req.user.id, name, exercises);

    res.status(201).json(workout);
  } catch (error: any) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ error: error.message || "Failed to create exercise" });
  }
});


exerciseRoutes.post("/workout", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
       res.status(403).json({ message: "User not authenticated" });
       return
    }

    const newExercise = await createWorkout({
      userId: req.user.id, 
      ...req.body,
    });

    res.status(201).json(newExercise);
  } catch (error: any) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ error: error.message || "Failed to create exercise" });
  }
});


// get all workouts
exerciseRoutes.get("/exercise", authenticate, async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        res.status(403).json({ message: "User not authenticated" });
        return
      }
      console.log(req.user.id);
      const workouts = await getAllWorkouts(req.user.id);
      res.status(200).json(workouts);
    } catch (error: any) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: error.message || "Failed to fetch workouts" });
    }
});

export default exerciseRoutes;
