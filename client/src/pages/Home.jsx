import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Animation from "../components/Animation";

const classLinkPrimary =
  "animate duration-300 col-span-4 w-full flex justify-between items-center rounded-xl px-3.5 py-2.5 bg-red-300 shadow-sm text-white hover:bg-red-300 hover:text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";
const classLinkPrimaryOutline =
  "animate duration-200 col-span-4 w-full flex justify-center items-center gap-x-1 rounded-xl border border-violet-500 px-3.5 py-2.5 text-md font-semibold text-violet-500 shadow-sm hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";
const classLinkSecondary =
  "animate duration-300 col-span-4 w-full flex justify-between items-center rounded-xl px-3.5 py-2.5 bg-violet-600 shadow-sm text-white hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Animation>
      <div className="flex flex-col gap-2">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Hi, {currentUser.username}!
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            Test your skills against friends and family using QuizApp and
            improve your skills day by day.
          </p>
        </div>
        <div className="grid grid-col-4 gap-2">
          <Link
            to="/apps/quiz-app-new/profile"
            className="animate duration-300 col-span-4 w-full flex justify-between items-center rounded-xl px-3.5 py-2.5 bg-gray-900 dark:bg-gray-100 shadow-sm text-white hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                Your Profile
              </h3>
              <p className="text-sm">Check your progress and achievements</p>
            </div>
            <div>
              <span>
                <ChevronRightIcon className="size-6" />
              </span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-8 gap-2">
          <Link
            to="/apps/quiz-app-new/start-game"
            className={classLinkSecondary}
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                Let's Start Now!
              </h3>
              <p className="text-sm text-gray-100">
                Play, Learn and Explore with Quiz App!
              </p>
            </div>
            <div className="flex justify-center items-center">
              <span>
                <ChevronRightIcon className="size-6" />
              </span>
            </div>
          </Link>
          <Link
            to="/apps/quiz-app-new/ranking"
            className={classLinkPrimaryOutline}
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                Check out leaderboard
              </h3>
              <p className="text-sm">Play, Learn and Expllore with Quiz App!</p>
            </div>
            <div className="flex justify-center items-center">
              <span>
                <ChevronRightIcon className="size-6" />
              </span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-4 mt-4">
            <h3>Choose category</h3>
            <Categories />
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default Home;
