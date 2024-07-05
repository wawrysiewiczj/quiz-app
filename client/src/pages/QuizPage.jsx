import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { quizSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
        if (res.ok) {
          setQuiz(data.quizzes[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizSlug]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleSubmit = () => {
    // Tu można dodać logikę do sprawdzania odpowiedzi i obliczania wyniku
    console.log("Selected answers:", selectedAnswers);
    // Na przykład, można obliczyć wynik:
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswerIndex) {
        score += 1;
      }
    });
    alert(`Your score is: ${score}/${quiz.questions.length}`);
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

  return (
    <div>
      <h2 className="text-center text-2xl font-bold tracking-normal text-gray-800 sm:text-3xl mt-2">
        {quiz && quiz.title}
      </h2>
      <p className="text-center text-sm">{quiz && quiz.category}</p>
      <div className="max-w-2xl mx-auto mt-8">
        {quiz &&
          quiz.questions &&
          quiz.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border-b border-gray-200 mb-8">
              <h3 className="font-semibold">{`Question ${questionIndex + 1}: ${
                question.content
              }`}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {question.answers &&
                  question.answers.map((answer, answerIndex) => (
                    <li key={answerIndex} className="">
                      <input
                        type="radio"
                        value={answerIndex}
                        name={`question-${questionIndex}`}
                        id={`question-${questionIndex}-answer-${answerIndex}`}
                        onChange={() =>
                          handleAnswerSelect(questionIndex, answerIndex)
                        }
                        checked={selectedAnswers[questionIndex] === answerIndex}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`question-${questionIndex}-answer-${answerIndex}`}
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
          ))}
        <button
          onClick={handleSubmit}
          className="mt-4 animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
