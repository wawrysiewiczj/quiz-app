import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", questions: [] });
  const [createError, setCreateError] = useState(null);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].answers[answerIndex] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].correctAnswerIndex = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setCreateError(null);
        navigate(`/quiz/${data.slug}`);
        return;
      }
      setCreateError(null);
      // Przekierowanie lub inne akcje po pomyślnym utworzeniu quizu
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error(data.message);
      setCreateError("Something went wrong");
    }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { content: "", answers: ["", "", "", ""], correctAnswerIndex: 0 },
      ],
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
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
          placeholder="Quiz Title"
          value={formData.title}
          onChange={handleTitleChange}
          className="flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
        />

        {formData.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="w-full flex flex-col gap-2 my-4 py-4 border border-t-gray-300"
          >
            <label
              htmlFor={`question-${questionIndex}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Question {questionIndex + 1}
            </label>
            <input
              type="text"
              id={`question-${questionIndex}`}
              name="content"
              value={question.content}
              onChange={(e) => handleQuestionChange(questionIndex, e)}
              className="flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
              placeholder={`Enter question ${questionIndex + 1}`}
            />

            {question.answers.map((answer, answerIndex) => (
              <input
                key={answerIndex}
                type="text"
                name={`answer-${questionIndex}-${answerIndex}`}
                value={answer}
                onChange={(e) =>
                  handleAnswerChange(questionIndex, answerIndex, e)
                }
                className="flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                placeholder={`Enter answer ${answerIndex + 1}`}
              />
            ))}

            <label
              htmlFor={`correct-answer-${questionIndex}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correct Answer
            </label>
            <select
              id={`correct-answer-${questionIndex}`}
              name={`correctAnswer-${questionIndex}`}
              value={question.correctAnswerIndex}
              onChange={(e) => handleCorrectAnswerChange(questionIndex, e)}
              className="flex-1 bg-white placeholder:text-gray-500 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
            >
              {question.answers.map((answer, answerIndex) => (
                <option key={answerIndex} value={answerIndex}>{`Answer ${
                  answerIndex + 1
                }`}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="animate duration-200 w-full flex justify-center items-center gap-x-1 rounded-xl border border-violet-500 px-3.5 py-2.5 text-md font-semibold text-violet-500 shadow-sm hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="animate duration-300 w-full flex justify-center items-center gap-x-1 rounded-xl bg-violet-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
