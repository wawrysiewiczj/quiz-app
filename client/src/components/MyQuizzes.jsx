import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TrashIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const MyQuizzes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userQuizzes, setUserQuizzes] = useState([]);
  console.log(userQuizzes);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quiz/get?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserQuizzes(data.quizzes);
        }
      } catch (error) {
        console.error("Error fetching user quizzes:", error.message);
        // Obsługa błędów - można dodać komponent do wyświetlania błędów
      }
    };
    fetchQuizzes();
  }, [currentUser._id]);

  return (
    <div className="">
      {userQuizzes.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <ul className="grid grid-cols-4 gap-2">
          {userQuizzes.map((quiz) => (
            <Link
              key={quiz._id}
              to={`/quiz/${quiz.slug}`}
              className="animate duration-300 col-span-4 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-sm px-3.5 py-2.5"
            >
              <li key={quiz._id} className="flex justify-between items-center">
                <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                  <span className="rounded-xl bg-violet-300 dark:bg-violet-800 p-3 bg-opacity-70">
                    <AcademicCapIcon className="h-6 w-6" />
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-md font-bold leading-6">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="flex justify-center items-center bg-red-500 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <TrashIcon className="w-5 h-5 inline" />
                </button>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyQuizzes;
