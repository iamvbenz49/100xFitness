export default interface ExerciseInput {
    userId: string,
    workoutId: string;
    name: string;
    sets?: { reps: number; weight: number }[];
}