import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Animation from "../components/Animation";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/apps/quiz-app-new/login");
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Animation>
      <div className="">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="form_control">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              aria-describedby="username"
              aria-invalid="false"
              className="w-full flex-1 bg-gray-100 text-gray-700 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
              onChange={handleChange}
            />
            <div id="username" className="sr-only">
              Please enter a valid username. It must contain at least 6
              characters.
            </div>
          </div>
          <div className="form_control">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              aria-describedby="email"
              aria-invalid="false"
              className="w-full flex-1 bg-gray-100 text-gray-700 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
              onChange={handleChange}
            />
            <div id="email" className="sr-only">
              ehem
            </div>
          </div>
          <div className="form_control">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              aria-describedby="password"
              aria-invalid="false"
              className="w-full flex-1 bg-gray-100 text-gray-700 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
              onChange={handleChange}
            />
            <div id="password" className="sr-only">
              your password should be more than 6 character
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              disabled={loading}
              className="animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 disabled:bg-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              type="submit"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <OAuth />
          </div>
        </form>

        <div className="flex items-center text-sm gap-2 mt-2">
          <p className="text-gray-500">Already have an account? </p>
          <Link
            to="/apps/quiz-app-new/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            <span>Sign In</span>
          </Link>
        </div>
        <p className="text-red-600 mt-2">{error && "Something went wrong"}</p>
      </div>
    </Animation>
  );
};

export default SignUp;
