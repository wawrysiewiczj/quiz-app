import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-toastify";

// import components
import ButtonPrimary from "../components/ButtonPrimary";
import Animation from "../components/Animation";

import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
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
        toast.error(error.message);
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
        toast.error(error.message);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success("User updated successfully!");
      navigate("/apps/quiz-app-new/profile");
    } catch (error) {
      dispatch(updateUserFailure(error));
      toast.error(error.message);
    }
  };

  return (
    <Animation>
      <div className="relative flex flex-col w-full outline-none focus:outline-none">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2 my-2"
        >
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.profilePhoto || currentUser.profilePhoto}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
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
            <button
              disabled={loading}
              type="submit"
              text={loading ? "Loading..." : "Save"}
            ></button>
          </div>
        </form>
      </div>
    </Animation>
  );
};

export default EditProfile;
