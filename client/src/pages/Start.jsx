import React from "react";

import Animation from "../components/Animation";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";

const Start = () => {
  return (
    <Animation>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <h1 className="text-4xl font-bold tracking-wide">
            Challenge yourself. Enhance your skills. Play bite-sized games.
          </h1>
          <p>
            Try it now. Dare to be better day by day and don't forget to have
            fun.
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-2">
          <ButtonPrimary
            text="Getting started"
            to="/apps/quiz-app-new/sign-up"
          />
          <ButtonSecondary
            text="I have an account"
            to="/apps/quiz-app-new/login"
          />
        </div>
      </div>
    </Animation>
  );
};

export default Start;
