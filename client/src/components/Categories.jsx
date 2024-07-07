import React, { useState, useEffect } from "react";
import { AcademicCapIcon, PlusIcon } from "@heroicons/react/24/outline";
import Animation from "../components/Animation";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} from "../redux/category/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createError, setCreateError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quizzes: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(fetchCategoryStart());

        const res = await fetch(`/api/category/get`);
        if (!res.ok) {
          throw new Error(`Error fetching categories: ${res.statusText}`);
        }

        const data = await res.json();

        dispatch(fetchCategorySuccess(data));
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        dispatch(fetchCategoryFailure(error));
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <Animation>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.slug}`}
            className="animate duration-300 flex flex-col justify-center items-center col-span-2 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 rounded-xl shadow-sm px-3.5 py-2.5 hover:bg-red-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <div className="flex items-center overflow-hidden">
              <span className="rounded-xl bg-violet-300 dark:bg-violet-700 p-3 bg-opacity-70">
                <AcademicCapIcon className="h-6 w-6" />
              </span>
            </div>
            <h3 className="text-md font-semibold leading-6">{category.name}</h3>
            <span className="text-sm opacity-70">10 Quizzes</span>
          </Link>
        ))}
      </div>
    </Animation>
  );
};

export default Categories;
