import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import Notifications from "./Notifications";

const headerIconClassName =
  "animate duration-300 w-auto flex justify-center items-center gap-x-1 rounded-xl px-3 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const getTitle = () => {
    const { pathname } = location;
    switch (pathname) {
      case "/apps/quiz-app-new/":
        return "Quiz App";
      case "/apps/quiz-app-new/start":
        return "Quiz App";
      case "/apps/quiz-app-new/notifications":
        return "Notifications";
      case "/apps/quiz-app-new/messages":
        return "Chat";
      case "/apps/quiz-app-new/settings":
        return "Settings";
      case "/apps/quiz-app-new/profile":
        return "Profile";
      case "/apps/quiz-app-new/edit-profile":
        return "Edit Profile";
      case "/apps/quiz-app-new/start-game":
        return "Choose category";
      case "/apps/quiz-app-new/create-quiz":
        return "Create Quiz";
      default:
        return "Quiz App";
    }
  };

  return (
    <div className="w-full py-1.5 flex flex-col justify-between items-center max-w-3xl mx-auto">
      <div className="w-full py-1.5 flex justify-between items-center max-w-3xl mx-auto">
        {currentUser ? (
          <Link to="/apps/quiz-app-new/" className={`${headerIconClassName}`}>
            <ChevronLeftIcon className="size-5 text-gray-800 dark:text-gray-200" />
          </Link>
        ) : (
          <div className={headerIconClassName} />
        )}

        <h2 className="px-3 py-2 text-lg font-semibold">{getTitle()}</h2>
        {currentUser ? (
          <Notifications />
        ) : (
          <div className={headerIconClassName} />
        )}
      </div>
      {/* <form className="w-full flex gap-2">
        <input
          type="text"
          className="flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
          placeholder="Search"
        />
        <button className="flex justify-center items-center bg-violet-600 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <MagnifyingGlassIcon className="w-5 h-5 inline" />
        </button>
      </form> */}
    </div>
  );
};

export default Header;
