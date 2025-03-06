import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { authenticate } from "../auth/authenticate";
import { addWeightLog, getWeightLogs } from "../services/weightService";

dotenv.config();

const weightRoutes = express.Router();

weightRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    if(!req.user) {
        res.status(400).json({error: "user illada"})
        return;
    }
    const userId = req.user.id;
    const weights = await getWeightLogs(userId);
    res.json(weights);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});


weightRoutes.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const { weight } = req.body;
    if (!weight) {
        res.status(400).json({ error: "Weight is required" });
        return;
    }
    if(!req.user) {
        res.status(400).json({error: "user illada"})
        return;
    } 
    const userId = req.user.id;

    const newWeight = await addWeightLog(userId, weight);

    res.json(newWeight);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default weightRoutes;
