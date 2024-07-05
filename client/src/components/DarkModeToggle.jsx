import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("dark-mode");
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Switch
      checked={darkMode}
      onChange={setDarkMode}
      className={`${darkMode ? "bg-blue-600" : "bg-gray-200"}
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
    >
      <span
        className={`${darkMode ? "translate-x-6" : "translate-x-1"}
            inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </Switch>
  );
}

export default DarkModeToggle;
