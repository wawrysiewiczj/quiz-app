import QuizResults from "../models/quizResult.model.js";
import { errorHandler } from "../utils/error.js";

export const quizResult = async (req, res, next) => {
  try {
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.score && { score: req.query.score }),
      ...(req.query.points && { points: req.query.points }),
    };

    const quizResults = await QuizResults.find(query);

    if (!quizResults.length) {
      return next(errorHandler(404, "Quiz Result not found!"));
    }

    res.status(200).json(quizResults);
  } catch (error) {
    next(error);
  }
};
