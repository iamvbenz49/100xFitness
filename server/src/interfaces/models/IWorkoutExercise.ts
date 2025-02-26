import mongoose, { Document } from "mongoose";

export default interface IWorkoutExercise extends Document {
  workoutId: mongoose.Types.ObjectId;
  name: string;
  sets: mongoose.Types.ObjectId[];
}