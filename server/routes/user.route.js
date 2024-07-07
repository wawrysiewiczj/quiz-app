import express from "express";
import {
  updateUser,
  user,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getUserStats } from "../controllers/userStats.controller.js";
import { getUserQuizResults } from "../controllers/quizResult.controller.js";

const router = express.Router();

router.get("/", user);

router.post("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/stats/:id", verifyToken, getUserStats);

router.get("/results/:id", verifyToken, getUserQuizResults);

export default router;
