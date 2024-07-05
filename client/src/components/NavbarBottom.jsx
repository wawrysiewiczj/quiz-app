import React from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/apps/quiz-app-new/", icon: HomeIcon, label: "Home" },
  {
    to: "/apps/quiz-app-new/start-game",
    icon: Squares2X2Icon,
    label: "Start Game",
  },
  {
    to: "/apps/quiz-app-new/create-quiz",
    icon: PlusIcon,
    label: "Create Quiz",
  },
  { to: "/apps/quiz-app-new/messages", icon: EnvelopeIcon, label: "Messages" },
  { to: "/apps/quiz-app-new/profile", icon: UserIcon, label: "My Profile" },
];

const NavbarBottom = () => {
  const location = useLocation();

  return (
    <div className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 fixed bottom-0 left-0 z-50 shadow-sm backdrop-blur-lg bg-opacity-50">
      <div className="flex justify-around max-w-3xl mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <div key={index} className="group">
              <Link
                to={item.to}
                className={`flex items-end justify-center text-center mx-auto w-full rounded-xl group-hover:text-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  isActive ? "text-violet-600" : ""
                }`}
              >
                <span className="block px-1 py-1">
                  <span className="sr-only block text-xs">{item.label}</span>
                  <item.icon
                    className={`size-6 pt-1 mb-1 ${
                      isActive ? "text-violet-600" : ""
                    }`}
                  />
                  <span
                    className={`animate duration-300 block w-5 mx-auto h-1 ${
                      isActive ? "bg-violet-600" : ""
                    } rounded-full`}
                  ></span>
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarBottom;
