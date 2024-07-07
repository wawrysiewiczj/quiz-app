import UserStats from "../models/userStats.model.js";
import { errorHandler } from "../utils/error.js";

export const getUserStats = async (req, res, next) => {
  const userId = req.params.id; // Use req.params to get the userId from the URL

  if (!userId) {
    return next(errorHandler(400, "User ID is required"));
  }

  try {
    const userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      return res.status(404).json({ message: "User stats not found" });
    }

    res.status(200).json(userStats);
  } catch (error) {
    next(error);
  }
};
