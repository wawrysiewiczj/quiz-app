import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import {
  AcademicCapIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

// import components
import Animation from "../components/Animation";
import EditProfile from "../components/EditProfile";
import Settings from "../components/Settings";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      navigate("/apps/quiz-app-new/start");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Animation>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {/* Profile Info */}
        <div className="col-span-4 rounded-xl p-3 bg-gray-100 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <img
              className="w-16 h-16 rounded-full object-cover cursor-pointer"
              src={formData.profilePhoto || currentUser.profilePhoto}
              alt="Profile Poto"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                {currentUser.username}
              </h3>
              <p className="text-gray-700 text-sm">{currentUser.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <EditProfile />
            <Settings />
            <Link
              onClick={handleSignOut}
              className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl p-2 text-md font-semibold text-violet-500 hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <ArrowRightStartOnRectangleIcon className="size-5 text-gray-700" />
            </Link>
          </div>
        </div>

        {/* Quiz Statistics */}
        <div className="col-span-4 bg-gray-100 rounded-xl shadow-sm p-4 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Quiz Statistics
          </h3>
          <div className="grid grid-cols-3 gap-2 text-gray-700">
            <div>
              <h4 className="text-2xl font-bold text-violet-500">15</h4>
              <p className="text-sm">Quizzes Taken</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-violet-500">85%</h4>
              <p className="text-sm">Average Score</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-violet-500">10</h4>
              <p className="text-sm">Quizzes Created</p>
            </div>
          </div>
        </div>

        {/* Completed Quizzes */}
        <div className="col-span-4 bg-gray-100 rounded-xl shadow-sm p-4 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Completed Quizzes
          </h3>
          <ul className="text-gray-700 grid grid-cols-4 gap-2">
            <li className="animate duration-300 flex justify-between items-center col-span-4 bg-green-100 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <div>
                <h3 className="text-md font-semibold leading-6">Math</h3>
                <p className="text-sm font-semibold">Level 1</p>
              </div>
              <div className="p-3 rounded-full w-12 h-12 flex justify-center items-center ring ring-green-300">
                <span>100%</span>
              </div>
            </li>
            <li className="animate duration-300 flex justify-between items-center col-span-4 bg-green-100 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <div>
                <h3 className="text-md font-semibold leading-6">Math</h3>
                <p className="text-sm font-semibold">Level 2</p>
              </div>
              <div className="p-3 rounded-full w-12 h-12 flex justify-center items-center ring ring-green-300">
                <span>90%</span>
              </div>
            </li>
            <li className="animate duration-300 flex justify-between items-center col-span-4 bg-red-100 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <div>
                <h3 className="text-md font-semibold leading-6">Math</h3>
                <p className="text-sm font-semibold">Level 3</p>
              </div>
              <div className="p-3 rounded-full w-12 h-12 flex justify-center items-center ring ring-red-300">
                <span>30%</span>
              </div>
            </li>
            <li className="animate duration-300 flex justify-between items-center col-span-4 bg-orange-100 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <div>
                <h3 className="text-md font-semibold leading-6">Math</h3>
                <p className="text-sm font-semibold">Level 4</p>
              </div>
              <div className="p-3 rounded-full w-12 h-12 flex justify-center items-center ring ring-orange-300">
                <span>60%</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Favorite Quizzes */}
        <div className="col-span-4 bg-gray-100 rounded-xl shadow-sm p-4 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">My Quizzes</h3>
          <ul className="text-gray-700 grid grid-cols-4 gap-2">
            <li className="animate duration-300 flex flex-col justify-center items-center col-span-2 bg-gray-200 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <h3 className="text-md font-semibold leading-6">Math</h3>
              <p className="text-sm font-semibold">Level 1</p>
              <span className="text-sm opacity-70">90%</span>
            </li>
            <li className="animate duration-300 flex flex-col justify-center items-center col-span-2 bg-gray-200 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <h3 className="text-md font-semibold leading-6">Math</h3>
              <p className="text-sm font-semibold">Level 1</p>
              <span className="text-sm opacity-70">90%</span>
            </li>
            <li className="animate duration-300 flex flex-col justify-center items-center col-span-2 bg-gray-200 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <h3 className="text-md font-semibold leading-6">Math</h3>
              <p className="text-sm font-semibold">Level 1</p>
              <span className="text-sm opacity-70">90%</span>
            </li>
            <li className="animate duration-300 flex flex-col justify-center items-center col-span-2 bg-gray-200 text-gray-800 rounded-xl shadow-sm px-3.5 py-2.5">
              <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                <span className="rounded-xl bg-violet-300 p-3 bg-opacity-70">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <h3 className="text-md font-semibold leading-6">Math</h3>
              <p className="text-sm font-semibold">Level 1</p>
              <span className="text-sm opacity-70">90%</span>
            </li>
          </ul>
        </div>
      </div>
    </Animation>
  );
};

export default Profile;
