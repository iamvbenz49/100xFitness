import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  passwordHash: string,
  workouts: mongoose.Types.ObjectId[];
  routines: mongoose.Types.ObjectId[];
  weightLogs: mongoose.Types.ObjectId[];
  nutrition: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export default IUser;