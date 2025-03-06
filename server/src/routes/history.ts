import express, { Router, Request, Response } from "express";
import { authenticate } from "../auth/authenticate";
import { getUserWorkouts } from "../services/workoutServices";

const historyRoutes = express.Router();

historyRoutes.get("/", authenticate, async (req, res) => {

    try {
      if(!req || !req.user) {
        res.json({message:"user illada"});
        return;
      }
      const history = await getUserWorkouts(req.user.id); 
      res.json({ data: history});
    } catch (error) {
      console.error("Error updating target:", error);
      res.status(500).json({ error: "Failed to update target" });
    }
});

export default historyRoutes;
