import React, { useState, useEffect } from "react";
import { AcademicCapIcon, PlayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const UserQuizzes = () => {
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quiz/get`);
        const data = await res.json();
        if (res.ok) {
          setUserQuizzes(data.quizzes);
        }
      } catch (error) {
        console.error("Error fetching user quizzes:", error.message);
      }
    };
    fetchQuizzes();
  });

  return (
    <div>
      {userQuizzes.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <ul className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {userQuizzes.map((quiz) => (
            <Link
              key={quiz._id}
              to={`/quiz/${quiz.slug}`}
              className="animate duration-300 col-span-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm px-3.5 py-2.5"
            >
              <li key={quiz._id} className="flex justify-between items-center">
                <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                  <span className="rounded-xl bg-gray-200 dark:bg-gray-800 p-3 bg-opacity-70">
                    <AcademicCapIcon className="h-6 w-6" />
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-md font-bold leading-6">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.category ? quiz.category.name : "Unknown Category"}
                  </p>
                </div>
                <div className="pr-1.5 pl-2 py-2 w-8 h-8 rounded-full text-violet-800 bg-violet-300 dark:bg-violet-800 flex justify-center items-center">
                  <PlayIcon className="h-6 w-6" />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserQuizzes;
