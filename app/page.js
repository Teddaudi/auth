"use client"
import Users from "./users/page"
import { createContext } from "react";


const ThemeContext = createContext()
export default function Home() {
  return (
    <ThemeContext.Provider>
      <Users/>
    </ThemeContext.Provider>
  );
}
