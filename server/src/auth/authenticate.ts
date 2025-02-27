import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/userService";
import { User } from "@prisma/client"; 
import AuthRequest from "../interfaces/auth/AuthRequest";

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.sendStatus(401);
        return;
    } 

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
        if (err) {
            res.sendStatus(403);
            return;
        } 

        if (!decoded || typeof decoded !== "object" || !("email" in decoded)) {
            res.sendStatus(403);
            return;
        }

        const user: User | null = await findUserByEmail(decoded.email as string);
        if (!user) {
            res.sendStatus(404);
            return;
        }  

        req.user = user; 
        next(); 
    });
};
