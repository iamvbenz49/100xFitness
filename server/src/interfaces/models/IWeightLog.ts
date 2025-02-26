import mongoose, { Document } from "mongoose";

export default interface IWeightLog extends Document {
  userId: mongoose.Types.ObjectId;
  weight: number;
  createdAt: Date;
}