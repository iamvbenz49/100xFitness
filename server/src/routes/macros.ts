import { Router } from "express";
import { authenticate } from "../auth/authenticate";
import { createMacroEntry, fetchMacros } from "../controllers/macros";

const macrosRoutes = Router();

macrosRoutes.get("/", authenticate, fetchMacros);
macrosRoutes.post("/", authenticate, createMacroEntry);

export default macrosRoutes;
