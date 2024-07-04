import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getMessages);
router.post("/send/:id", verifyToken, sendMessage);

export default router;
