import React, { useState } from "react";
import { useSelector } from "react-redux";

import Animation from "../components/Animation";
import Categories from "../components/Categories";
import UserQuizzes from "../components/UserQuizzes"; // Import UserQuizzes component

const StartGame = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("categories"); // Default active tab is "categories"

  return (
    <Animation>
      <div className="mb-4 p-1 mx-auto flex justify-center bg-gray-100 dark:bg-gray-900 rounded-full">
        <button
          onClick={() => setActiveTab("categories")}
          className={`animate duration-200 w-full px-4 py-1 font-semibold rounded-2xl ${
            activeTab === "categories"
              ? "bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-gray-100"
              : "bg-transparent"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("userQuizzes")}
          className={`animate duration-200 w-full px-4 py-1 font-semibold rounded-2xl ${
            activeTab === "userQuizzes"
              ? "bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-gray-100"
              : "bg-transparent "
          }`}
        >
          User Quizzes
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        {/* Conditionally render Categories or UserQuizzes based on activeTab state */}
        {activeTab === "categories" && <Categories />}
        {activeTab === "userQuizzes" && <UserQuizzes />}
      </div>
    </Animation>
  );
};

export default StartGame;
