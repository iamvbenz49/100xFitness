import { useState, useEffect } from "react";
import axios from "axios";
import { Exercise } from "../interfaces/Exercise";
import ExerciseInputProps from "../interfaces/ExerciseInput";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const WorkoutCreator = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sampleExercises, setSampleExercises] = useState<string[]>([]);

  // Fetch sample exercises from the backend
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user may not be authenticated.");
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/exercise`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setSampleExercises(response.data.map((exercise: any) => exercise.name));
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  // Add new exercise
  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: Date.now(), name: "", sets: 1, reps: 1, weight: 1 },
    ]);
  };

  // Update exercise fields dynamically
  const updateExercise = (id: number, field: keyof Exercise, value: string | number) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  // Handle workout submission
  const handleSubmit = async () => {
    if (!workoutName.trim()) {
      console.error("Workout name is required.");
      return;
    }

    const formattedExercises = exercises.map((ex) => ({
      name: ex.name.trim(),
      sets: Array.from({ length: ex.sets }, () => ({ reps: ex.reps, weight: ex.weight })),
    }));

    const workoutData = {
      name: workoutName.trim(),
      exercises: formattedExercises,
    };

    console.log("Submitting workout:", JSON.stringify(workoutData, null, 2));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Cannot save workout.");
        return;
      }

      const response = await axios.post(`${BACKEND_URL}exercise`, workoutData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setWorkoutName("");
        setExercises([]);
        setTimer(0);
        setIsRunning(false);
        console.log("Workout saved successfully:", response.data);
      }
    } catch (error: any) {
      console.error("Error saving workout:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Workout</h1>
      <input
        type="text"
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <p className="text-lg">
        Time: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </p>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isRunning ? "Pause" : "Start"} Timer
      </button>

      {exercises.map((exercise) => (
        <ExerciseInput
          key={exercise.id}
          exercise={exercise}
          updateExercise={updateExercise}
          sampleExercises={sampleExercises}
        />
      ))}

      <button
        onClick={addExercise}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Add Exercise
      </button>

      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Save Workout
      </button>
    </div>
  );
};

const ExerciseInput = ({
  exercise,
  updateExercise,
  sampleExercises,
}: ExerciseInputProps & { sampleExercises: string[] }) => {
  const [searchTerm, setSearchTerm] = useState(exercise.name);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = sampleExercises.filter((ex) =>
        ex.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, sampleExercises]);

  return (
    <div className="border p-2 my-2 relative">
  <label className="block text-sm font-medium">Exercise Name</label>
  <input
    type="text"
    placeholder="Exercise Name"
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      updateExercise(exercise.id, "name", e.target.value);
    }}
    className="border p-1 w-full mb-1"
  />

  {suggestions.length > 0 && (
    <ul className="absolute bg-white border w-full z-10">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => {
            updateExercise(exercise.id, "name", suggestion);
            setSearchTerm(suggestion);
            setSuggestions([]);
          }}
          className="p-2 cursor-pointer hover:bg-gray-200"
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )}

  <label className="block text-sm font-medium">Sets</label>
  <input
    type="number"
    placeholder="Sets"
    value={exercise.sets}
    onChange={(e) => updateExercise(exercise.id, "sets", Number(e.target.value))}
    className="border p-1 w-full mb-1"
  />

  <label className="block text-sm font-medium">Reps</label>
  <input
    type="number"
    placeholder="Reps"
    value={exercise.reps}
    onChange={(e) => updateExercise(exercise.id, "reps", Number(e.target.value))}
    className="border p-1 w-full mb-1"
  />

  <label className="block text-sm font-medium">Weight (kg)</label>
  <input
    type="number"
    placeholder="Weight (kg)"
    value={exercise.weight}
    onChange={(e) => updateExercise(exercise.id, "weight", Number(e.target.value))}
    className="border p-1 w-full mb-1"
  />
</div>

  );
};

export default WorkoutCreator;
