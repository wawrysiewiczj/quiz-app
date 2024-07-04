import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import Animation from "../components/Animation";

import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";

const Settings = () => {
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);
  const [enabled4, setEnabled4] = useState(false);

  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return (
    <Animation>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {/* Application Settings */}
        <div className="col-span-4 bg-gray-100 rounded-xl shadow-sm p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Application Settings
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Dark Mode</span>
              <Switch
                disabled
                checked={enabled1}
                onChange={setEnabled1}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-white transition data-[checked]:bg-violet-600"
              >
                <span className="animate duration-200 size-4 translate-x-1 rounded-full bg-gray-200 transition group-data-[checked]:translate-x-6" />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Notifications</span>
              <Switch
                disabled
                checked={enabled2}
                onChange={setEnabled2}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-white transition data-[checked]:bg-violet-600"
              >
                <span className="animate duration-200 size-4 translate-x-1 rounded-full bg-gray-200 transition group-data-[checked]:translate-x-6" />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Language</span>
              <select
                disabled
                className="bg-gray-100 text-gray-700 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Polish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="col-span-4 bg-gray-100 rounded-xl shadow-sm p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Notification Settings
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Enable Email Notifications</span>
              <Switch
                disabled
                checked={enabled3}
                onChange={setEnabled3}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-white transition data-[checked]:bg-violet-600"
              >
                <span className="animate duration-200 size-4 translate-x-1 rounded-full bg-gray-200 transition group-data-[checked]:translate-x-6" />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Enable Push Notifications</span>
              <Switch
                disabled
                checked={enabled4}
                onChange={setEnabled4}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-white transition data-[checked]:bg-violet-600"
              >
                <span className="animate duration-200 size-4 translate-x-1 rounded-full bg-gray-200 transition group-data-[checked]:translate-x-6" />
              </Switch>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="col-span-4 bg-gray-100 rounded-lg shadow-sm p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Account Settings
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between"></div>
            <div className="flex items-center justify-between">
              <button className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl border border-violet-500 px-3.5 py-2.5 text-sm font-semibold text-violet-500 shadow-sm hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="">Change Password</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleDeleteAccount}
                className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl border border-red-500 px-3.5 py-2.5 text-sm font-semibold text-red-500 shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span className="">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default Settings;
