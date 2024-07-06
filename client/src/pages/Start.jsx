import React from "react";
import Animation from "../components/Animation";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Balancer from "react-wrap-balancer";

const Start = () => {
  return (
    <Animation>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <img
            className="w-[70%]"
            src="https://friendshipquizzes.com/assets/images/friendship-quiz.png"
            alt=""
          />
          <h1 className="text-3xl font-bold tracking-wide">
            <Balancer>
              Challenge yourself. Enhance your skills. Play bite-sized games.
            </Balancer>
          </h1>
          <p className="text-md w-full sm:max-w-md mx-auto">
            <Balancer>
              Try it now. Dare to be better day by day and don't forget to have
              fun.
            </Balancer>
          </p>
        </div>
        <div className="w-full sm:max-w-md mx-auto flex flex-col md:flex-row gap-2">
          <SignUp />
          <Login />
        </div>
      </div>
    </Animation>
  );
};

export default Start;
