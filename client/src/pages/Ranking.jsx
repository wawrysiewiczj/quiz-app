import React, { useState } from "react";
import { useSelector } from "react-redux";

import Animation from "../components/Animation";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const weeklyLeaders = {
    podium: [
      { name: "Alice", score: 1200 },
      { name: "Bob", score: 1100 },
      { name: "Charlie", score: 1000 },
    ],
    others: [
      { name: "David", score: 950 },
      { name: "Eve", score: 900 },
      { name: "Eve", score: 900 },
      { name: "Eve", score: 900 },
      { name: "Eve", score: 900 },
      { name: "Eve", score: 900 },
      { name: "Eve", score: 900 },
    ],
  };

  const allTimeLeaders = {
    podium: [
      { name: "Zara", score: 3000 },
      { name: "Yasmin", score: 2900 },
      { name: "Xander", score: 2800 },
    ],
    others: [
      { name: "Walt", score: 2700 },
      { name: "Victor", score: 2600 },
      { name: "Victor", score: 2600 },
      { name: "Victor", score: 2600 },
      { name: "Victor", score: 2600 },
      { name: "Victor", score: 2600 },
      { name: "Victor", score: 2600 },
    ],
  };

  const leaders = activeTab === "weekly" ? weeklyLeaders : allTimeLeaders;

  return (
    <Animation>
      <h2 className="text-2xl font-semibold mb-6">Leaderboard</h2>
      <div className="mb-4 p-1 mx-auto flex justify-center bg-gray-100 rounded-full">
        <button
          onClick={() => setActiveTab("weekly")}
          className={`animate duration-200 w-full px-4 py-1 font-semibold rounded-2xl ${
            activeTab === "weekly"
              ? "bg-violet-200 text-violet-800"
              : "bg-transparent"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setActiveTab("all-time")}
          className={`animate duration-200 w-full px-4 py-1 font-semibold rounded-2xl ${
            activeTab === "all-time"
              ? "bg-violet-200 text-violet-800"
              : "bg-transparent "
          }`}
        >
          All time
        </button>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {leaders.podium.map((person, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <span>{index + 1}</span>
                <img
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  src={currentUser.profilePhoto}
                  alt="Profile Poto"
                />

                <div className="flex flex-col">
                  <span className="text-md font-bold">{person.name}</span>
                  <span className="text-sm text-gray-500 font-semibold">
                    {person.score} points
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {leaders.others.map((person, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <span>{index + 4}</span>
                <img
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  src={currentUser.profilePhoto}
                  alt="Profile Poto"
                />

                <div className="flex flex-col">
                  <span className="text-md font-bold">{person.name}</span>
                  <span className="text-sm text-gray-500 font-semibold">
                    {person.score} points
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Animation>
  );
};

export default Ranking;
