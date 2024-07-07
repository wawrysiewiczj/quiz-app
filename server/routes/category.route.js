import express from "express";
import { create, get } from "../controllers/category.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/get", verifyToken, get);

export default router;
