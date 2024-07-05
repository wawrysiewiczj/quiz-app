import UserQuiz from "../models/userquiz.model.js";
import { errorHandler } from "../utils/error.js";

// Tworzenie nowego quizu użytkownika
export const createQuiz = async (req, res) => {
  const { userId, quizId } = req.body;

  try {
    // Sprawdzamy, czy quiz istnieje
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Tworzymy nowy obiekt UserQuiz
    const newUserQuiz = new UserQuiz({
      userId: userId,
      quizId: quizId,
      title: quiz.title,
      category: quiz.category,
      questions: quiz.questions.map((question) => ({
        content: question.content,
        answers: question.answers,
        correctAnswerIndex: question.correctAnswerIndex,
      })),
    });

    // Zapisujemy nowy quiz użytkownika
    const savedUserQuiz = await newUserQuiz.save();
    res.status(201).json(savedUserQuiz);
  } catch (error) {
    errorHandler(error, res);
  }
};

// Pobieranie wszystkich quizów użytkownika
export const getUserQuizzes = async (req, res) => {
  const { userId } = req.params;

  try {
    // Pobieramy wszystkie quizy użytkownika
    const userQuizzes = await UserQuiz.find({ userId: userId });
    res.status(200).json(userQuizzes);
  } catch (error) {
    errorHandler(error, res);
  }
};

// Edycja quizu użytkownika
export const updateUserQuiz = async (req, res) => {
  const { userQuizId } = req.params;
  const { title, category, questions } = req.body;

  try {
    // Sprawdzamy, czy quiz użytkownika istnieje
    let userQuiz = await UserQuiz.findById(userQuizId);
    if (!userQuiz) {
      return res.status(404).json({ message: "User quiz not found" });
    }

    // Aktualizujemy pola quizu użytkownika
    userQuiz.title = title;
    userQuiz.category = category;
    userQuiz.questions = questions;

    // Zapisujemy zaktualizowany quiz użytkownika
    const updatedUserQuiz = await userQuiz.save();
    res.status(200).json(updatedUserQuiz);
  } catch (error) {
    errorHandler(error, res);
  }
};

// Usuwanie quizu użytkownika
export const deleteUserQuiz = async (req, res) => {
  const { userQuizId } = req.params;

  try {
    // Usuwamy quiz użytkownika
    await UserQuiz.findByIdAndDelete(userQuizId);
    res.status(200).json({ message: "User quiz deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};
