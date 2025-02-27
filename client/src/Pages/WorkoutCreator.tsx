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
        console.log("token", token)
        if (!token) {
            console.error("No token found, user may not be authenticated.");
            return;
        }

        const response = await axios.get(`${BACKEND_URL}exercise`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
        });
        console.log(response.data)
        if (response.data) {
          setSampleExercises(response.data.map((exercise: any) => exercise.name));
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now(), name: "", sets: 0, reps: 0, weight: 0 }]);
  };

  const updateExercise = (id: number, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)));
  };

  const handleSubmit = async () => {
    const workoutData = { name: workoutName, exercises};

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BACKEND_URL}/exercise`, workoutData, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
      });

      if (response.data) {
        setWorkoutName("");
        setExercises([]);
        setTimer(0);
        setIsRunning(false);
      }
    } catch (error) {
      console.error("Error saving workout:", error);
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
      <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-500 text-white px-4 py-2 rounded">
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

      <button onClick={addExercise} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
        Add Exercise
      </button>

      <button onClick={handleSubmit} className="bg-purple-500 text-white px-4 py-2 rounded mt-4 w-full">
        Save Workout
      </button>
    </div>
  );
};

const ExerciseInput = ({ exercise, updateExercise, sampleExercises }: ExerciseInputProps & { sampleExercises: string[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
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
      <input
        type="text"
        placeholder="Exercise Name"
        value={exercise.name}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          updateExercise(exercise.id, "name", e.target.value);
        }}
        className="border p-1 w-full mb-1"
      />

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                updateExercise(exercise.id, "name", suggestion);
                setSearchTerm("");
                setSuggestions([]);
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <input
        type="number"
        placeholder="Sets"
        value={exercise.sets}
        onChange={(e) => updateExercise(exercise.id, "sets", Number(e.target.value))}
        className="border p-1 w-full mb-1"
      />
      <input
        type="number"
        placeholder="Reps"
        value={exercise.reps}
        onChange={(e) => updateExercise(exercise.id, "reps", Number(e.target.value))}
        className="border p-1 w-full mb-1"
      />
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
