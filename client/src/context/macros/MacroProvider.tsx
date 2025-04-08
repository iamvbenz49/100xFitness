import { ReactNode, useEffect, useState } from "react";
import { Macro, MacrosContext } from "./MacrosContext";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const MacrosProvider = ({ children }: { children: ReactNode }) => {
  const [macros, setMacros] = useState<Macro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchMacros = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<{
          data: {
            id: string;
            createdAt: string;
            userId: string;
            calories: number;
            protein: number;
            carbs: number;
            fats: number;
          }[];
        }>(`${BACKEND_URL}macros`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = response.data.data.map((entry) => ({
          protein: entry.protein,
          carbs: entry.carbs,
          fat: entry.fats,
          createdAt: entry.createdAt,
        }));

        setMacros(filtered);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setErr(e.response?.data?.message || e.message);
        } else {
          setErr("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMacros();
  }, []);

  return (
    <MacrosContext.Provider value={{ macros, setMacros, loading, err, setErr }}>
      {children}
    </MacrosContext.Provider>
  );
};