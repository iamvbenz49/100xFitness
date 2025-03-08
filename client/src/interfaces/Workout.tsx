import type Exercise from "./Exercise";

export interface Workout {
    id: string;
    name: string;
    createdAt: string;
    exercises: Exercise[];
}
