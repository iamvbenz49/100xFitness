import express, { Router, Request, Response } from "express";
import { authenticate } from "../auth/authenticate";
import WorkoutRequestBody from "../interfaces/workouts/WorkoutRequestBody";
import {getUserWorkoutExercises, createWorkout } from "../services/workoutServices";

const workoutRoutes = express.Router();




workoutRoutes.post("/workouts", authenticate, async (req: any, res) => {
  try {
    if (!req.user) {
      res.status(403).json({ message: "User not authenticated" });
      return
    }
    if(!req.body) {
      res.status(400).json({message: "Body not found"})
      return
    }
    console.log(req.body)
    const newWorkout = await createWorkout(req.body["sessionName"], req.user.id, req.body["workouts"]);

    res.status(201).json({message: "created"});
  } catch (error: any) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: error.message || "Failed to create workout" });
  }
});


workoutRoutes.get("/workouts", authenticate, async (req: Request<{}, {}, WorkoutRequestBody>, res: Response) => {
  try {
    if (!req || !req.user) {
      res.status(400).json({ success: false, message: "Invalid request data. Please provide workout details." });
      return
    }
    const userId = req.user.id;
    const workouts = await getUserWorkoutExercises(userId);
    console.log(JSON.stringify(workouts))
    res.status(201).json({
      success: true,
      data:workouts,
      message: "Workout session saved successfully!",
    });
  } catch (error) {
    console.error("Error saving workout:", error);
    res.status(500).json({ success: false, message: "An error occurred while saving the workout." });
  }
});

export default workoutRoutes;
