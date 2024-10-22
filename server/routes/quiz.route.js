import express from "express";
import { create, get, finish } from "../controllers/quiz.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route do tworzenia nowego quizu użytkownika
router.post("/create", verifyToken, create);

router.get("/get", verifyToken, get);

router.post("/finish", verifyToken, finish);

export default router;
