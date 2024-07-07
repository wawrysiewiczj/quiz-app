import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Animation from "../components/Animation";

const QuizPage = () => {
  const { quizSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/quiz/get?slug=${quizSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok && data.quizzes.length > 0) {
          setQuiz(data.quizzes[0]);
          setLoading(false);
          setError(false);
          setIsLastQuestion(false); // Reset to false on quiz reload
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizSlug]);

  useEffect(() => {
    if (quiz) {
      const correctAnswersMap = {};
      quiz.questions.forEach((question, index) => {
        correctAnswersMap[index] = question.correctAnswerIndex;
      });
      setCorrectAnswers(correctAnswersMap);
    }
  }, [quiz]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    if (currentQuestionIndex === quiz.questions.length - 1) {
      finishQuiz();
    } else {
      handleNextQuestion();
    }
  };

  const finishQuiz = async () => {
    let points = 0;
    const numberOfQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswerIndex) {
        points += 1;
      }
    });

    const score = (points / numberOfQuestions) * 100;

    // Prepare data to send to backend
    const results = {
      quizId: quiz._id, // Replace with actual quiz ID from your backend model
      selectedAnswers,
      correctAnswers,
      score,
      points,
    };

    try {
      const res = await fetch("/api/quiz/finish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(results),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Quiz results submitted successfully:", data);
        setScore(score);
        setFinished(true);
        // Handle any further actions upon successful submission
      } else {
        console.error("Failed to submit quiz results");
        // Handle error case if needed
      }
    } catch (error) {
      console.error("Error while submitting quiz results:", error);
      // Handle error case if needed
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error loading quiz
      </div>
    );

  if (finished) {
    // Display quiz results
    return (
      <Animation>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Quiz Results</h2>
            <p className="mt-4 text-xl text-gray-700">
              {(score || 0).toFixed(1)}%
            </p>
            {/* You can add more details or actions related to quiz results here */}
          </div>
        </div>
      </Animation>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Animation>
      <div>
        <h2 className="text-center text-2xl font-bold tracking-normal text-gray-800 sm:text-3xl mt-2">
          {quiz && quiz.title}
        </h2>
        <p className="text-center text-sm">
          {quiz.category ? quiz.category.name : "Unknown Category"}
        </p>
        <div className="max-w-2xl mx-auto mt-8">
          <div
            key={currentQuestionIndex}
            className="border-b border-gray-200 mb-8"
          >
            <p>{`Question ${currentQuestionIndex + 1}/${
              quiz.questions.length
            }`}</p>
            <h3 className="font-semibold">{`${currentQuestion.content}`}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {currentQuestion.answers &&
                currentQuestion.answers.map((answer, answerIndex) => (
                  <li key={answerIndex} className="">
                    <input
                      type="radio"
                      value={answerIndex}
                      name={`question-${currentQuestionIndex}`}
                      id={`question-${currentQuestionIndex}-answer-${answerIndex}`}
                      onChange={() =>
                        handleAnswerSelect(currentQuestionIndex, answerIndex)
                      }
                      checked={
                        selectedAnswers[currentQuestionIndex] === answerIndex
                      }
                      className="hidden peer"
                    />
                    <label
                      htmlFor={`question-${currentQuestionIndex}-answer-${answerIndex}`}
                      className={`animate duration-200 cursor-pointer w-100 flex text-md font-semibold text-gray-800 bg-gray-100 px-3.5 py-2.5 rounded-xl shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
                  peer-checked:ring-0 peer-checked:ring-violet-600 peer-checked:bg-gray-300 peer-checked:border-transparent`}
                      tabIndex="0"
                      role="radio"
                    >
                      {answer}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="mt-4 animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Finish Quiz
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-4 animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </Animation>
  );
};

export default QuizPage;
