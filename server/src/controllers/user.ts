import { Request, Response } from "express";
import { getUserById, updateUserById } from "../services/userService";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if(!req.user) {
        res.status(404).json({ error: "User id illada" });
        return;
    }
    const userId = req.user.id;
    const user = await getUserById(userId);

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return
    }

    const userId = req.user.id;
    const updateData = req.body;

    const updatedUser = await updateUserById(userId, updateData);

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};