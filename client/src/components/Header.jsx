import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
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
    <div className="fixed top-0 left-0 bg-gray-200 w-full py-1.5 px-4 shadow-sm backdrop-blur-lg bg-opacity-50 z-50">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {currentUser ? (
          <Link to="/apps/quiz-app-new/" className={`${headerIconClassName}`}>
            <ChevronLeftIcon className="size-5 text-gray-700" />
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
    </div>
  );
};

export default Header;
