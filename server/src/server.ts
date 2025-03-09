import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import cors from "cors";
import targetRoutes from "./routes/target";
import workoutRoutes from "./routes/workouts";
import historyRoutes from "./routes/history";
import weightRoutes from "./routes/weight";
import macrosRoutes from "./routes/macros";
import userRoutes from "./routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json()); 


app.use("/api/auth", authRoutes); 
app.use("/api", targetRoutes); 
app.use("/api", workoutRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/weight", weightRoutes);
app.use("/api/macros", macrosRoutes)
app.use("/api/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello Bro</h1>")
})
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
