import React, { useState, useEffect } from "react";

const UserQuizzes = ({ userId }) => {
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const response = await fetch(`/api/userquiz/user/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserQuizzes(data);
      } catch (error) {
        console.error("Error fetching user quizzes:", error);
        // Obsługa błędów - można dodać komponent do wyświetlania błędów
      }
    };

    fetchUserQuizzes();
  }, [userId]);

  return (
    <div>
      <h2>Your Quizzes</h2>
      {userQuizzes.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <ul>
          {userQuizzes.map((quiz) => (
            <li key={quiz._id}>
              <p>Title: {quiz.title}</p>
              <p>Category: {quiz.category}</p>
              <button onClick={() => handleDeleteQuiz(quiz._id)}>
                Delete Quiz
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserQuizzes;
