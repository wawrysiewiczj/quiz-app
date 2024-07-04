import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import {
  AcademicCapIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  XMarkIcon,
  Cog8ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

// import components
import ButtonError from "../components/ButtonError";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import Animation from "../components/Animation";

import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [ShowModalEditProfile, setShowModalEditProfile] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
        toast.error("Image upload failed!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePhoto: downloadURL });
          toast.success("Image uploaded successfully!");
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        toast.error("User update failed!");
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success("User updated successfully!");
    } catch (error) {
      dispatch(updateUserFailure(error));
      toast.error("An error occurred during user update!");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        toast.error("Account deletion failed!");
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account deleted successfully!");
    } catch (error) {
      dispatch(deleteUserFailure(error));
      toast.error("An error occurred during account deletion!");
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      navigate("/apps/quiz-app-new/start");
      dispatch(signOut);
      toast.success("Signed out successfully!");
    } catch (error) {
      toast.error("An error occurred during sign out!");
      console.log(error);
    }
  };

  const handleButtonEventDelete = () => {
    setShowModalEditProfile(false);
    handleDeleteAccount();
  };

  const handleButtonEventUpdate = () => {
    setShowModalEditProfile(false);
    handleSubmit();
  };

  return (
    <Animation>
      <ToastContainer
        autoClose={5000}
        draggablePercent={60}
        position="top-right"
      />
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
            <button
              onClick={() => setShowModalEditProfile(true)}
              className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl p-2 text-md font-semibold text-violet-500 hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <PencilSquareIcon className="size-5 text-gray-700" />
            </button>
            <Link
              to="/apps/quiz-app-new/settings"
              className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl p-2 text-md font-semibold text-violet-500 hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Cog8ToothIcon className="size-5 text-gray-700" />
            </Link>
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

      {ShowModalEditProfile ? (
        <Animation>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full px-6 mx-auto max-w-3xl">
              <div className="p-3 rounded-lg shadow-lg relative flex flex-col w-full border border-1 border-gray-300 bg-gray-100 outline-none focus:outline-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Edit profile</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModalEditProfile(false)}
                  >
                    <span className="text-black opacity-7 text-xl block p-2 rounded-full">
                      <XMarkIcon className="size-6 text-gray-700" />
                    </span>
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-2 my-2"
                >
                  <input
                    type="file"
                    ref={fileRef}
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <p className="text-sm">
                    {imageUploadError ? (
                      <span className="text-red-700">
                        Error uploading image (file size must be less than 2 MB)
                      </span>
                    ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
                      <span className="text-slate-700">{`Uploading: ${imageUploadProgress} %`}</span>
                    ) : imageUploadProgress === 100 ? (
                      <span className="text-green-700">
                        Image uploaded successfully
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <input
                    defaultValue={currentUser.username}
                    type="text"
                    id="username"
                    placeholder="Your name"
                    className="flex-1 w-full bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                    onChange={handleChange}
                  />
                  <input
                    defaultValue={currentUser.email}
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="flex-1 w-full bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="mb-4 flex-1 w-full bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                    onChange={handleChange}
                  />
                  <div className="flex gap-2">
                    <ButtonPrimary
                      type="submit"
                      text={loading ? "Loading..." : "Save"}
                      onClick={handleButtonEventUpdate}
                    ></ButtonPrimary>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Animation>
      ) : null}
    </Animation>
  );
};

export default Profile;
