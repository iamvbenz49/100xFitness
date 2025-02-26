import mongoose, { Document } from "mongoose";

export default interface IRoutineExercise extends Document {
  routineId: mongoose.Types.ObjectId;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
