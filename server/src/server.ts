import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import cors from "cors";
import targetRoutes from "./routes/target";
import exerciseRoutes from "./routes/exercise";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); 


app.use("/api/auth", authRoutes); 
app.use("/api", targetRoutes); 
app.use("/api", exerciseRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
