import React from "react";
import { Link } from "react-router-dom";

const ButtonError = ({ text, to, onClick }) => {
  return (
    <Link
      className="animate duration-300 w-full flex border border-1 border-red-400 justify-center items-center rounded-xl px-3.5 py-2.5 text-md font-semibold text-red-500 hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      to={to}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default ButtonError;
