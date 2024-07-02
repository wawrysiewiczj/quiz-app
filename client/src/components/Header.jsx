import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const headerIconClassName =
  "animate duration-300 w-auto flex justify-center items-center gap-x-1 rounded-xl px-3 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="fixed top-0 left-0 bg-gray-100 w-full py-1.5 px-4 shadow-sm backdrop-blur-lg bg-opacity-50 z-50">
      <div className={`flex justify-between items-center max-w-3xl mx-auto`}>
        {currentUser ? (
          <Link to="/apps/quiz-app-new/" className={`${headerIconClassName}`}>
            <ArrowLeftIcon className="size-5 text-gray-700" />
          </Link>
        ) : (
          <Link
            to="/apps/quiz-app-new/start"
            className={`${headerIconClassName}`}
          >
            <XMarkIcon className="size-5 text-gray-700" />
          </Link>
        )}

        {currentUser ? (
          <Link className="py-3" to="/apps/quiz-app-new/">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              Quiz App
            </h1>
          </Link>
        ) : (
          <Link className="py-3" to="/apps/quiz-app-new/start">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              Quiz App
            </h1>
          </Link>
        )}
        {currentUser ? (
          <Link
            to="/apps/quiz-app-new/notifications"
            className={headerIconClassName}
          >
            <BellIcon className="size-5 text-gray-700" />
          </Link>
        ) : (
          <Link to="/apps/quiz-app-new/login" className={headerIconClassName}>
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
