import Quiz from "../models/quiz.model.js";
import QuizResult from "../models/quizResult.model.js";
import UserStats from "../models/userStats.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new quiz
export const create = async (req, res, next) => {
  const { title, questions, category } = req.body;

  if (!title || !questions || !questions.length || !category) {
    return next(
      errorHandler(
        400,
        "Please provide a title, at least one question with answers, and select a category"
      )
    );
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newQuiz = new Quiz({
    title,
    questions,
    category,
    slug,
    userId: req.user.id,
  });

  try {
    const savedQuiz = await newQuiz.save();
    res.status(201).json({ quizId: savedQuiz._id, slug: savedQuiz.slug });
  } catch (error) {
    next(error);
  }
};

export const get = async (req, res, next) => {
  try {
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.quizId && { _id: req.query.quizId }),
    };
    const quizzes = await Quiz.find(query).populate("category", "name");
    const totalQuizzesByUser = await Quiz.countDocuments({
      userId: req.query.userId,
    });
    res.status(200).json({
      quizzes,
      totalQuizzesByUser,
    });
  } catch (error) {
    next(error);
  }
};

// Finish a quiz and update user stats
export const finish = async (req, res, next) => {
  const { quizId, points, score } = req.body; // Removed numberOfQuestions variable

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(errorHandler(404, "Quiz not found"));
    }

    // Calculate score and update user stats
    const userStats = await UserStats.findOne({ userId: req.user.id });

    if (!userStats) {
      // Create new UserStats entry if not exists
      const newUserStats = new UserStats({
        userId: req.user.id,
        quizzesTaken: 1,
        totalPoints: points,
        totalQuestions: quiz.questions.length,
        quizzesCompleted: 1,
        totalScore: score,
        averageScore: score,
      });
      await newUserStats.save();
    } else {
      // Update existing UserStats
      userStats.quizzesTaken += 1;
      userStats.totalPoints += points;
      userStats.totalQuestions += quiz.questions.length;
      userStats.quizzesCompleted += 1;
      userStats.totalScore += score;
      userStats.averageScore =
        userStats.totalScore / userStats.quizzesCompleted;
      await userStats.save();
    }

    // Create a new QuizResult document
    const quizResult = new QuizResult({
      quizId,
      points,
      score,
      numberOfQuestions: quiz.questions.length,
      userId: req.user.id,
    });
    await quizResult.save();

    res.status(201).json({ message: "Quiz result saved successfully" });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    next(error);
  }
};
