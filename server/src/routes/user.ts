import express from "express";
import { authenticate } from "../auth/authenticate";
import { getUserProfile, updateUserProfile } from "../controllers/user";

const userRoutes = express.Router();

userRoutes.get("/", authenticate, getUserProfile);
userRoutes.put("/", authenticate, updateUserProfile);

export default userRoutes;
