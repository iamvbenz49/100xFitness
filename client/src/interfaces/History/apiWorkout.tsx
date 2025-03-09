export default interface apiWorkout {
    id: string;
    name: string;
    createdAt: string; 
    sets: { weight: number; reps: number }[];
}

