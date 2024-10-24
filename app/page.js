"use client"
import Users from "./users/page"
import { createContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemeContext = createContext()
export default function Home() {
  return (
    <ThemeContext.Provider>
      <Users/>
      <ToastContainer />
    </ThemeContext.Provider>
  );
}
