import React from "react";
import { Link } from "react-router-dom";
import Animation from "./Animation";
import {
  AcademicCapIcon,
  BeakerIcon,
  BookOpenIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const iconStyle = "h-8 w-8";

const categories = [
  {
    id: "1",
    to: "/apps/quiz-app/quizzes",
    icon: <AcademicCapIcon className={iconStyle} />,
    title: "Math",
    amount: "12 Quizzes",
  },
  {
    id: "2",
    to: "/apps/quiz-app/quizzes",
    icon: <BeakerIcon className={iconStyle} />,
    title: "Science",
    amount: "12 Quizzes",
  },
  {
    id: "3",
    to: "/apps/quiz-app/quizzes",
    icon: <GlobeAltIcon className={iconStyle} />,
    title: "History",
    amount: "12 Quizzes",
  },
  {
    id: "4",
    to: "/apps/quiz-app/quizzes",
    icon: <BookOpenIcon className={iconStyle} />,
    title: "Literature",
    amount: "12 Quizzes.",
  },
  {
    id: "5",
    to: "/apps/quiz-app/quizzes",
    icon: <BookOpenIcon className={iconStyle} />,
    title: "Art",
    amount: "12 Quizzes",
  },
  {
    id: "6",
    to: "/apps/quiz-app/quizzes",
    icon: <BookOpenIcon className={iconStyle} />,
    title: "Music",
    amount: "12 Quizzes",
  },
];

const Categories = () => {
  return (
    <Animation>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.to}
            className="animate duration-300 flex flex-col justify-center items-center col-span-2 bg-gray-100 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5 hover:bg-red-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <div className="flex items-center overflow-hidden">
              <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                <AcademicCapIcon className="h-6 w-6" />
              </span>
            </div>
            <h3 className="text-md font-semibold leading-6">
              {category.title}
            </h3>
            <span className="text-sm opacity-70">{category.amount}</span>
          </Link>
        ))}
      </div>
    </Animation>
  );
};

export default Categories;
