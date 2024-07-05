import express from "express";
import {
  createQuiz,
  getUserQuizzes,
  updateUserQuiz,
  deleteUserQuiz,
} from "../controllers/userquiz.controller.js";
import { errorHandler } from "../utils/error.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route do tworzenia nowego quizu użytkownika
router.post("/create", verifyToken, createQuiz);

// Route do pobierania wszystkich quizów użytkownika
router.get("/user/:userId", verifyToken, getUserQuizzes);

// Route do aktualizacji quizu użytkownika
router.put("/:userQuizId", verifyToken, updateUserQuiz);

// Route do usuwania quizu użytkownika
router.delete("/:userQuizId", verifyToken, deleteUserQuiz);

// Obsługa błędów
router.use(errorHandler);

export default router;
