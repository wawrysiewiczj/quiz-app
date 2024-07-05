import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-gray-200 text-gray-900 dark:text-gray-100 dark:bg-gray-800">
        <div className="pb-16 max-w-3xl mx-auto px-4 antialiased min-h-[100vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
