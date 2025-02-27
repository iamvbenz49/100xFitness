import express, { Router, Request, Response } from "express";
import { authenticate } from "../auth/authenticate";

const routineRoutes = express.Router();

routineRoutes.post("/routines", authenticate, async (req, res) => {

    try {
      if(!req || !req.user) {
        res.json({message:"user illada"});
        return;
      }
    } catch (error: any) {
      console.error("Error updating target:", error);
      res.status(500).json({ error: "Failed to update target" });
    }
});


routineRoutes.post("/routines", authenticate, async (req, res) => {
    try {
      if(!req || !req.user) {
        res.json({message:"user illada"});
        return;
      }
    } catch (error: any) {
      console.error("Error updating target:", error);
      res.status(500).json({ error: "Failed to update target" });
    }
});

export default routineRoutes;
