import { Response } from "express";
import { findUserByEmail } from "../services/userService";
import AuthRequest from "../interfaces/auth/AuthRequest";
import { checkPassword } from "../utils/checkPassword";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";


export const authorize = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User | null = await findUserByEmail(email);

    if (!user || typeof user.passwordHash !== "string") {
      res.status(400).json({ message: "Invalid Login" });
      return
    }

    const isPasswordValid = await checkPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid Login" });
      return
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { email: user.email, id: user.id }, 
      process.env.JWT_SECRET
    );

    req.user = { name: user.name, email: user.email, id: user.id };

    res.locals.token = token;
    res.status(200).json({
      message: "Login successful",
      token: res.locals.token,  
      user: req.user 
    });
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
