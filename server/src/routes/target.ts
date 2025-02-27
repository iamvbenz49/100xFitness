import express, { Router, Request, Response } from "express";
import { generateToken } from "../auth/generateToken";
import { updateUserGoal } from "../services/userService";
import { authenticate } from "../auth/authenticate";

const targetRoutes = express.Router();

targetRoutes.post("/target", authenticate, async (req, res) => {

    try {
      if(!req || !req.user) {
        res.json({message:"user illada"});
        return;
      }
      const { goal, targetWeight, currentWeight } = req.body;
      const id = req.user;
      if(!id) {
        res.json({message: "ID illada"})
      }
      console.log("hmm", req.user.id)
      const user = await updateUserGoal( req.user.id, goal, targetWeight, currentWeight);  
      res.json({ message: "Target updated successfully", user });
    } catch (error) {
      console.error("Error updating target:", error);
      res.status(500).json({ error: "Failed to update target" });
    }
});

export default targetRoutes;
