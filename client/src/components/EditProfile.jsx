import { Drawer } from "vaul";

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-toastify";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

// import components
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [dragging, setDragging] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const [open, setOpen] = React.useState(false);
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePhoto: downloadURL });
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
    } catch (error) {
      dispatch(updateUserFailure(error));
      toast.error(error.message);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setImage(droppedFile);
  };

  const handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitClose = () => {
    handleSubmit();
    setOpen(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl p-2 text-md font-semibold text-violet-500 hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          <PencilSquareIcon className="size-5 text-gray-700" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 max-h-[80%]">
          <div className="p-4 bg-gray-100 rounded-t-[10px] pb-24 flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium text-center">
                Edit profile
              </Drawer.Title>
              <div>
                <form
                  onSubmit={(handleSubmit) => {
                    wait().then(() => setOpen(false));
                    handleSubmit.preventDefault();
                  }}
                  className="w-full flex flex-col gap-2 mt-4 "
                >
                  <div
                    className={`w-full py-4 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center ${
                      dragging ? "bg-gray-100" : ""
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current.click()}
                  >
                    <input
                      id="profile-photo-input"
                      type="file"
                      ref={fileRef}
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <img
                      src={formData.profilePhoto || currentUser.profilePhoto}
                      alt="profile"
                      className="rounded-full h-24 w-24 object-cover cursor-pointer self-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                    />
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-700">
                        {dragging
                          ? "Drop the image here"
                          : "Drag & drop image here, or click to select"}
                      </p>
                    </div>
                    <p className="text-sm self-center">
                      {imageUploadError ? (
                        <span className="text-red-700">
                          Error Image upload (image must be less than 2 mb)
                        </span>
                      ) : imageUploadProgress > 0 &&
                        imageUploadProgress < 100 ? (
                        <span className="text-slate-700">{`Uploading ${imageUploadProgress}%`}</span>
                      ) : imageUploadProgress === 100 ? (
                        <span className="text-green-700">
                          Image successfully uploaded!
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
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
                  {/* Buttons */}
                  <div className="flex gap-2">
                    <ButtonSecondary
                      type="button"
                      text="Cancel"
                      onClick={() => setOpen(false)}
                    />
                    <ButtonPrimary
                      onClick={handleSubmitClose}
                      type="submit"
                      text={loading ? "Loading..." : "Save"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default EditProfile;
