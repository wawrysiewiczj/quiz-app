import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Animation from "../components/Animation";
import Categories from "../components/Categories";
import UserQuizzes from "../components/UserQuizzes";
import {
  AcademicCapIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const StartGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [createError, setCreateError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("categories");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const TabButton = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`animate duration-200 w-full px-4 py-1 font-semibold rounded-2xl ${
        isActive
          ? "bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-gray-100"
          : "bg-transparent"
      }`}
    >
      {children}
    </button>
  );

  // const renderContent = () => {
  //   if (activeTab === "categories") {
  //     return <Categories />;
  //   }
  //   if (activeTab === "userQuizzes") {
  //     return <UserQuizzes />;
  //   }
  //   return null;
  // };

  return (
    <Animation>
      {/* <div className="mb-4 p-1 mx-auto flex justify-center bg-gray-100 dark:bg-gray-900 rounded-full">
        <TabButton
          isActive={activeTab === "categories"}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </TabButton>
        <TabButton
          isActive={activeTab === "userQuizzes"}
          onClick={() => setActiveTab("userQuizzes")}
        >
          User Quizzes
        </TabButton>
      </div> */}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto w-full flex gap-2 mb-4"
      >
        <label
          htmlFor="name"
          className="sr-only block text-gray-700 text-sm font-bold"
        >
          Search
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white placeholder:text-sm placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
        />

        <button className="flex justify-center items-center bg-violet-600 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <MagnifyingGlassIcon className="w-5 h-5 inline" />
        </button>
      </form>

      {/* <div className="mb-4 flex flex-col gap-2">{renderContent()}</div> */}

      <UserQuizzes />
    </Animation>
  );
};

export default StartGame;
