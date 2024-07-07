import QuizResult from "../models/quizResult.model.js";
import { errorHandler } from "../utils/error.js";
export const getUserQuizResults = async (req, res, next) => {
  const userId = req.params.id; // Użyj req.params, aby pobrać userId z URL

  if (!userId) {
    return next(errorHandler(400, "User ID is required"));
  }

  try {
    const quizResults = await QuizResult.find({ userId })
      .populate({
        path: "userId", // pole w QuizResult, które odnosi się do User
        select: "username", // wybierz tylko pole 'username' z User
      })
      .populate({
        path: "quizId", // pole w QuizResult, które odnosi się do Quiz
        select: "title", // wybierz tylko pole 'title' z Quiz
      });

    if (!quizResults || quizResults.length === 0) {
      return res.status(404).json({ message: "Nie znaleziono wyników quizu" });
    }

    res.status(200).json(quizResults);
  } catch (error) {
    next(error);
  }
};
