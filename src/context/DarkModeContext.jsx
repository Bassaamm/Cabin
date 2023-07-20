import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)".match),
    "darkMode"
  );

  useEffect(() => {
    console.log(darkMode);
    if (darkMode) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  }, [darkMode]);

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }
  return (
    <DarkModeContext.Provider value={{ darkMode, handleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("can't use darkmode out of range");
  return context;
}

export { DarkModeProvider, useDarkMode };
