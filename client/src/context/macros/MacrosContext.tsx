import { createContext, type Dispatch, type SetStateAction } from "react";

export interface Macro {
  protein: number;
  carbs: number;
  fat: number;
  createdAt?: string;
}

export interface MacrosContextType {
  macros: Macro[];
  setMacros: Dispatch<SetStateAction<Macro[]>>;
  loading: boolean;
  err: string | null;
  setErr: Dispatch<SetStateAction<string | null>>;
}

export const MacrosContext = createContext<MacrosContextType | undefined>(
  undefined
);


