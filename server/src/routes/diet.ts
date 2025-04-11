import { Router } from "express";
import { authenticate } from "../auth/authenticate";
import { getAIDiet } from "../controllers/diet";

const dietAIRoutes = Router();

dietAIRoutes.post("/", authenticate, getAIDiet);

export default dietAIRoutes;
