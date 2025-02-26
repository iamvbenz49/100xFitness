import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import AuthRequest from "../interfaces/auth/AuthRequest";

export const generateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(400).json({ message: "User not found" });
    return
  }

  const token = jwt.sign(
    { email: req.user.email, id:req.user.id },
    process.env.JWT_SECRET as string,
  );

  res.status(201).json({
    message: "token generated",
    token,
    user: req.user,
  });
};
