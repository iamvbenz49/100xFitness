import { Request, Response } from "express";
import getAIResponse from "../utils/getAIResponse";


export const getAIDiet = async (req: Request, res: Response) => {
  try {
    if(!req.user) {
        res.status(400).json({error: "user illada"})
        return
    }
    const { query } = req.body;
    const response = await getAIResponse(query);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error"});
  }
};