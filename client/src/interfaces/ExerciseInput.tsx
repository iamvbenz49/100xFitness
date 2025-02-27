import { Exercise } from "./Exercise";

export default interface ExerciseInputProps {
    exercise: Exercise;
    updateExercise: (id: number, field: keyof Exercise, value: string | number) => void;
}