import express, { Request, Response } from "express";
import { authenticate } from "../auth/authenticate";
import { createExercise, getAllWorkouts } from "../services/exerciseService";
import AuthRequest from "../interfaces/auth/AuthRequest"; 
const exerciseRoutes = express.Router();


exerciseRoutes.post("/exercise", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
       res.status(403).json({ message: "User not authenticated" });
       return
    }

    const newExercise = await createExercise({
      userId: req.user.id, 
      ...req.body,
    });

    res.status(201).json(newExercise);
  } catch (error: any) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ error: error.message || "Failed to create exercise" });
  }
});


exerciseRoutes.get("/exercise", authenticate, async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        res.status(403).json({ message: "User not authenticated" });
        return
      }
      console.log(req.user.id)
      const workouts = await getAllWorkouts(req.user.id);
      res.status(200).json(workouts);
    } catch (error: any) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: error.message || "Failed to fetch workouts" });
    }
  });
export default exerciseRoutes;
