import mongoose, { Document } from "mongoose";

export default interface IRoutine extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  exercises: mongoose.Types.ObjectId[];
  createdAt: Date;
}