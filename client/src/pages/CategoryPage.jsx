import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchCategoryAndQuizzes = async () => {
      try {
        setLoading(true);
        const categoryRes = await fetch(
          `/api/category/get?slug=${categorySlug}`
        );
        const categoryData = await categoryRes.json();

        if (!categoryRes.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const category = categoryData.categories[0];
        setCategory(category);

        const quizzesRes = await fetch(`/api/quizzes/category/${category._id}`);
        const quizzesData = await quizzesRes.json();

        if (!quizzesRes.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        setQuizzes(quizzesData.quizzes);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCategoryAndQuizzes();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error loading category
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold tracking-normal text-gray-800 sm:text-3xl mt-2">
        {category && category.name}
      </h2>
      <p className="text-center text-sm">Title</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
            <p className="text-sm text-gray-600">{quiz.description}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
