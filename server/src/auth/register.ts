import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import AuthRequest from "../interfaces/auth/AuthRequest";
import { createNewUser, findUserByEmail } from "../services/userService";
import { User } from "@prisma/client";

const SALT_ROUNDS = 10;

export const register = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser: User | null = await findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" }); 
        return
      }
  
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await createNewUser(name, email, passwordHash);
  
      req.user = newUser
  
      next(); 
    } catch (error) {
      console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" }); 
        return
    }
  };
  