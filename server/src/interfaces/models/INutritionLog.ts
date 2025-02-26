import mongoose, { Document } from "mongoose";

export default interface INutritionLog extends Document {
  userId: mongoose.Types.ObjectId;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  createdAt: Date;
}