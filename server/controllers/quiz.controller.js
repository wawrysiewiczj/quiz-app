import Quiz from "../models/quiz.model.js";
import { errorHandler } from "../utils/error.js";

// Tworzenie nowego quizu użytkownika
export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.questions || !req.body.questions.length) {
    return next(
      errorHandler(
        400,
        "Please provide a title and at least one question with answers"
      )
    );
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newQuiz = new Quiz({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    next(error);
  }
};

export const get = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const quizzes = await Quiz.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.quizId && { _id: req.query.quizId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate("userId", "profilePhoto");

    const totalQuizzes = await Quiz.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthQuizzes = await Quiz.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      quizzes,
      totalQuizzes,
      lastMonthQuizzes,
    });
  } catch (error) {
    next(error);
  }
};
