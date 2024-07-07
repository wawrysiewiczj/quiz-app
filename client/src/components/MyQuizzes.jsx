import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TrashIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const MyQuizzes = () => {
  const { currentUser } = useSelector((state) => state.user);




  return (
    
  );
};

export default MyQuizzes;
