import React from "react";
import { Link } from "react-router-dom";

const ButtonPrimary = ({ text, to, onClick }) => {
  return (
    <Link
      className="animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      to={to}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default ButtonPrimary;
