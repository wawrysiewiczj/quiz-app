import React from "react";
import { Link } from "react-router-dom";

const ButtonSecondary = ({ text, to, onClick }) => {
  return (
    <Link
      className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl border border-violet-500 px-3.5 py-2.5 text-md font-semibold text-violet-500 shadow-sm hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      to={to}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default ButtonSecondary;
