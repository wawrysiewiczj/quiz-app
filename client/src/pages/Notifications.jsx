import React from "react";
import Animation from "../components/Animation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const Notifications = () => {
  const { notifications } = useNotificationCenter();

  return (
    <Animation>
      {/* Notification List */}

      <div>
        <ToastContainer />
        <ul className="flex flex-col gap-2">
          {notifications.length === 0 && <p>No notifications found.</p>}
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="p-4 rounded-xl shadow-sm bg-gray-100 text-gray-800"
            >
              <span>{notification.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </Animation>
  );
};

export default Notifications;
