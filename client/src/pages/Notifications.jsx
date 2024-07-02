import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Animation from "../components/Animation";

const notifications = [
  { id: 1, message: 'Your quiz "Math Basics" has been approved.', read: false },
  { id: 2, message: 'New comment on your quiz "Science Facts".', read: true },
  { id: 3, message: "Your password was changed successfully.", read: false },
  // Add more notifications as needed
];

const Notifications = () => {
  return (
    <Animation>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {/* Notification List */}
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-sm gap-x-4 ${
              notification.read ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            <span className="text-gray-800">{notification.message}</span>
            <div className="flex space-x-2">
              <button className="text-gray-800 bg-gray-200 px-1 py-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Animation>
  );
};

export default Notifications;
