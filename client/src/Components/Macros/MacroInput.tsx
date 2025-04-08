import { useState } from "react";
import { useMacros } from "../../hooks/useMacros";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const MacroInput: React.FC = () => {
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { setMacros, setErr } = useMacros();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (protein || carbs || fat) {
      const addMacro = async ({
        protein,
        carbs,
        fat,
      }: {
        protein: number;
        carbs: number;
        fat: number;
      }) => {
        setIsLoading(true);
        try {
          const token = localStorage.getItem("token");
          const { data } = await axios.post(
            `${BACKEND_URL}macros`,
            { protein, carbs, fats: fat },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMacros((prev) => [
            ...prev,
            {
              protein: data.data.protein,
              carbs: data.data.carbs,
              fat: data.data.fats,
              createdAt: data.data.createdAt,
            },
          ]);
          setProtein(0);
          setCarbs(0);
          setFat(0);
        } catch (e) {
          if (axios.isAxiosError(e)) {
            setErr(e.response?.data?.message || e.message);
          } else {
            setErr("Something went wrong");
          }
        } finally {
          setIsLoading(false);
        }
      };
      addMacro({ protein, carbs, fat });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-3 gap-4 text-white bg-gray-800/60 backdrop-blur-md p-5 rounded-xl border border-gray-700 shadow-xl mb-6"
    >
      {[
        { label: "Protein (g)", value: protein, setter: setProtein },
        { label: "Carbs (g)", value: carbs, setter: setCarbs },
        { label: "Fat (g)", value: fat, setter: setFat },
      ].map(({ label, value, setter }, idx) => (
        <div key={idx}>
          <label className="block mb-1 text-sm font-medium">{label}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div className="col-span-3 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/4 py-2 mt-2 rounded-lg transition font-medium ${
            isLoading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? "⏳ Adding..." : "➕ Add"}
        </button>
      </div>
    </form>
  );
};

export default MacroInput;
