import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "./OAuth";
import { Drawer } from "vaul";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and passwordConfirmation match
    if (formData.password !== formData.passwordConfirmation) {
      toast.error("Password confirmation does not match password");
      return;
    }

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
      setLoading(false);
      if (data.success === false) {
        setError(true);
        toast.error(data.message);
        return;
      }
      setOpen(false);
      setError(false);
      toast.success("Sign-up successful! Please log in.");
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error(error.message);
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Getting started
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 max-h-[80%]">
          <div className="p-4 bg-gray-100 rounded-t-[10px] flex-1 pb-24 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium text-center">
                Sign up
              </Drawer.Title>

              <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="form_control">
                    <label
                      className="block text-gray-700 text-sm font-semibold"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      placeholder="Username"
                      aria-describedby="username"
                      aria-invalid="false"
                      className="w-full flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                      onChange={handleChange}
                    />
                    <div id="username" className="sr-only">
                      Please enter a valid username. It must contain at least 6
                      characters.
                    </div>
                  </div>
                  <div className="form_control">
                    <label
                      className="block text-gray-700 text-sm font-semibold"
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="E-mail"
                      aria-describedby="email"
                      aria-invalid="false"
                      className="w-full flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                      onChange={handleChange}
                    />
                    <div id="email" className="sr-only">
                      ehem
                    </div>
                  </div>
                  <div className="form_control">
                    <label
                      className="block text-gray-700 text-sm font-semibold"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      placeholder="********"
                      aria-describedby="password"
                      aria-invalid="false"
                      className="w-full flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                      onChange={handleChange}
                    />
                    <div id="password" className="sr-only">
                      Your password should be more than 6 characters
                    </div>
                  </div>
                  <div className="form_control">
                    <label
                      className="block text-gray-700 text-sm font-semibold"
                      htmlFor="passwordConfirmation"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      placeholder="********"
                      aria-describedby="passwordConfirmation"
                      aria-invalid="false"
                      required
                      className="w-full flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                      onChange={handleChange}
                    />
                    <div id="passwordConfirmation" className="sr-only">
                      Please confirm your password
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
                    <div className="flex items-center justify-center text-sm gap-2 mt-2">
                      <p className="text-gray-500">Already have an account? </p>
                      <Link
                        to="/apps/quiz-app-new/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Sign In</span>
                      </Link>
                    </div>
                    <div className="flex flex-row justify-center pt-6 mb-10 relative">
                      <span className="absolute z-50 bg-gray-100 px-4 text-gray-500">
                        or sign-in with
                      </span>
                      <div className="w-full bg-gray-300 mt-3 h-px"></div>
                    </div>
                    <OAuth />
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

export default SignUp;
