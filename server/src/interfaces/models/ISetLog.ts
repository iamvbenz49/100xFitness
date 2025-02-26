import mongoose, { Document } from "mongoose";

export default interface ISetLog extends Document {
  exerciseId: mongoose.Types.ObjectId;
  reps: number;
  weight: number;
  isPersonalBest: boolean;
}