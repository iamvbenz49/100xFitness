import { Request, Response } from "express";
import { addMacroEntry, getMacrosByDate, getMacrosByUser } from "../services/nutritionService";

export const fetchMacros = async (req: Request, res: Response) => {
  try {
    if(!req.user) {
        res.status(400).json({error: "user illada"})
        return
    }
    const userId = req.user.id; 
    const macros = await getMacrosByUser(userId);
    res.json({ success: true, data: macros });
  } catch (error) {
    console.error("Error fetching macros:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const fetchMacrosByDate = async (req: Request, res: Response) => {
  try {
    if(!req.user) {
        res.status(400).json({error: "user illada"})
        return
    }
    const userId = req.user.id;
    const { date } = req.params;
    const macros = await getMacrosByDate(userId, date);
    res.json({ success: true, data: macros });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createMacroEntry = async (req: Request, res: Response) => {
  try {
    if(!req.user) {
        res.status(400).json({error: "user illada"})
        return
    }
    const userId = req.user.id;
    const { protein, carbs, fats } = req.body;

    if (!protein || !carbs || !fats) {
        res.status(400).json({ success: false, message: "All fields are required." });
        return
    }

    const newEntry = await addMacroEntry(userId, parseFloat(protein), parseFloat(carbs), parseFloat(fats));
    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
