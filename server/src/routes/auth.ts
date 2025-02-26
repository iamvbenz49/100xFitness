import express from "express";
import { register } from "../auth/register";
import { generateToken } from "../auth/generateToken";
import { authorize } from "../auth/authorize";

const authRoutes = express.Router();

authRoutes.post("/signup", register, generateToken); 
authRoutes.post("/login", authorize)
export default authRoutes;
