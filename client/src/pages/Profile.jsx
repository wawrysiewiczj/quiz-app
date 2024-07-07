import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import {
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  fetchUserStatsStart,
  fetchUserStatsSuccess,
  fetchUserStatsFailure,
} from "../redux/userStats/userStatsSlice";
import {
  fetchQuizResultStart,
  fetchQuizResultSuccess,
  fetchQuizResultFailure,
} from "../redux/quizResult/quizResultSlice";

// import components
import Animation from "../components/Animation";
import EditProfile from "../components/EditProfile";
import Settings from "../components/Settings";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading: loadingQuizResults,
    error: errorQuizResults,
    quizResults,
  } = useSelector((state) => state.quizResult);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [totalQuizzesByUser, setTotalQuizzesByUser] = useState(0);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quiz/get?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserQuizzes(data.quizzes);
          setTotalQuizzesByUser(data.totalQuizzesByUser);
        }
      } catch (error) {
        console.error("Error fetching user quizzes:", error.message);
      }
    };
    fetchQuizzes();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserStats = async () => {
      try {
        dispatch(fetchUserStatsStart());
        const response = await fetch(
          `/api/user/stats?userId=${currentUser._id}`
        ); // Ścieżka do API
        if (!response.ok) {
          throw new Error("Nie udało się pobrać danych.");
        }
        const data = await response.json();
        console.log("User Stats:", data); // Debugowanie
        dispatch(fetchUserStatsSuccess(data));

        // Fetch the total quizzes created by the user
        const quizResponse = await fetch(`/api/quiz/get?userId=${data.userId}`);
        if (!quizResponse.ok) {
          throw new Error("Nie udało się pobrać danych quizu.");
        }
        const quizData = await quizResponse.json();
        console.log("Total Quizzes by User:", quizData); // Debugowanie
        setTotalQuizzesByUser(quizData.totalQuizzesByUser);
      } catch (error) {
        dispatch(fetchUserStatsFailure(error.message));
      }
    };

    fetchUserStats();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchQuizResults = async () => {
      try {
        dispatch(fetchQuizResultStart());
        const res = await fetch(`/api/user/results/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          dispatch(fetchQuizResultSuccess(data));
        }
      } catch (error) {
        dispatch(fetchQuizResultFailure(error.message));
      }
    };

    fetchQuizResults();
  }, [dispatch, currentUser._id]);

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

  // Debug log
  const stats = userStats[0] || {};

  return (
    <Animation>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {/* Profile Info */}
        <div className="col-span-4 rounded-xl p-3 text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-900 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <img
              className="w-16 h-16 rounded-full object-cover cursor-pointer"
              src={formData.profilePhoto || currentUser?.profilePhoto}
              alt="Profile Photo"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold">
                {currentUser?.username}
              </h3>
              <p className="text-sm">{currentUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <EditProfile />
            <Settings />
            <Link
              onClick={handleSignOut}
              className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl p-2 text-md font-semibold hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <ArrowRightOnRectangleIcon className="size-5 " />
            </Link>
          </div>
        </div>

        {/* Quiz Statistics */}
        <div className="col-span-4 text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-900 rounded-xl shadow-sm p-4 text-center">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-md">Quiz Statistics</h3>
            <button className="font-bold text-sm text-violet-500">
              View all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 ">
            <div>
              <h4 className="text-2xl font-bold text-violet-500">
                {userStats.quizzesTaken || 0}
              </h4>
              <p className="text-sm">Quizzes Taken</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-violet-500">
                {(stats.averageScore || 0).toFixed(1)}%
              </h4>
              <p className="text-sm">Average Score</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-violet-500">
                {totalQuizzesByUser || 0}
              </h4>
              <p className="text-sm">Quizzes Created</p>
            </div>
          </div>
        </div>

        {/* Completed Quizzes */}
        <div className="col-span-4 text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-900 rounded-xl shadow-sm p-4 text-center">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-md">Completed Quizzes</h3>
            <button className="font-bold text-sm text-violet-500">
              View all
            </button>
          </div>

          <ul className="grid grid-cols-4 gap-2">
            {loadingQuizResults && <p>Loading...</p>}
            {errorQuizResults && <p>Error: {errorQuizResults}</p>}
            {!loadingQuizResults &&
              !errorQuizResults &&
              quizResults.map((result) => (
                <li
                  key={result._id}
                  className={`animate duration-300 flex justify-between items-center col-span-4 rounded-xl shadow-sm px-3.5 py-2.5 ${
                    result.score >= 80
                      ? "bg-green-100 text-gray-800 dark:bg-green-700 dark:text-gray-100"
                      : result.score >= 60
                      ? "bg-yellow-100 text-gray-800 dark:bg-yellow-600 dark:text-gray-100"
                      : result.score >= 40
                      ? "bg-orange-100 text-gray-800 dark:bg-orange-500 dark:text-gray-100"
                      : "bg-red-100 text-gray-800 dark:bg-red-500 dark:text-gray-100"
                  }`}
                >
                  <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                    <span className="rounded-xl bg-violet-300 dark:bg-violet-800 p-3 bg-opacity-70">
                      <AcademicCapIcon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-md font-bold leading-6">quiz title</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by username
                    </p>
                  </div>
                  <div className="p-3 rounded-full w-12 h-12 flex justify-center items-center ring dark:ring-green-500">
                    <span className="text-sm">
                      {(result.score || 0).toFixed(1)}%
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-span-4 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-sm p-4 text-center">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-md">My Quizzes</h3>
            <button className="font-bold text-sm text-violet-500">
              View all
            </button>
          </div>
          <div className="">
            {userQuizzes.length === 0 ? (
              <p>No quizzes available</p>
            ) : (
              <ul className="grid grid-cols-4 gap-2">
                {userQuizzes.map((quiz) => (
                  <Link
                    key={quiz._id}
                    to={`/quiz/${quiz.slug}`}
                    className="animate duration-300 col-span-4 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-sm px-3.5 py-2.5"
                  >
                    <li className="flex justify-between items-center">
                      <div className="mb-1 flex space-y-2 items-center gap-3 overflow-hidden">
                        <span className="rounded-xl bg-violet-300 dark:bg-violet-800 p-3 bg-opacity-70">
                          <AcademicCapIcon className="h-6 w-6" />
                        </span>
                      </div>
                      <div className="text-center">
                        <h3 className="text-md font-bold leading-6">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {quiz.category.name}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteQuiz(quiz._id);
                        }}
                        className="flex justify-center items-center bg-red-500 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <TrashIcon className="w-5 h-5 inline" />
                      </button>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default Profile;
