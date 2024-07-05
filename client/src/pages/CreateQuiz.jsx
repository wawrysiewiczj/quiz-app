import React, { useState } from "react";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { content: "", answers: ["", "", "", ""], correctAnswerIndex: 0 },
  ]);

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswerIndex = parseInt(
      event.target.value
    );
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { content: "", answers: ["", "", "", ""], correctAnswerIndex: 0 },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { title, questions });
    // Tutaj można dodać logikę do wysłania danych do backendu
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quiz Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`question-${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Question {index + 1}
            </label>
            <input
              type="text"
              id={`question-${index}`}
              name="content"
              value={question.content}
              onChange={(e) => handleQuestionChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder={`Enter question ${index + 1}`}
            />

            {question.answers.map((answer, answerIndex) => (
              <input
                key={answerIndex}
                type="text"
                name={`answer-${index}-${answerIndex}`}
                value={answer}
                onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                placeholder={`Enter answer ${answerIndex + 1}`}
              />
            ))}

            <label
              htmlFor={`correct-answer-${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correct Answer
            </label>
            <select
              id={`correct-answer-${index}`}
              name={`correctAnswer-${index}`}
              value={question.correctAnswerIndex}
              onChange={(e) => handleCorrectAnswerChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            >
              {question.answers.map((answer, answerIndex) => (
                <option key={answerIndex} value={answerIndex}>{`Answer ${
                  answerIndex + 1
                }`}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
