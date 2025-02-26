import mongoose, { Schema, Document } from "mongoose";


export default interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    exercises: mongoose.Types.ObjectId[];
    createdAt: Date;
}

