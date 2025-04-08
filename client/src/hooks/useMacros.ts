import { useContext } from "react";
import { MacrosContext } from "../context/macros/MacrosContext";

export const useMacros = () => {
  const context = useContext(MacrosContext);
  if (!context) {
    throw new Error("useMacros must be used within a MacrosProvider");
  }
  return context;
};
