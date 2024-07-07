import UserStats from "../models/userStats.model.js";

// Get user stats
export const getUserStats = async (req, res, next) => {
  try {
    const userId = req.userId; // Pobieramy _id zalogowanego użytkownika

    // Szukamy statystyk użytkownika na podstawie userId
    const userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      return res
        .status(404)
        .json({ message: "Statystyki użytkownika nie zostały znalezione." });
    }

    // Jeśli wszystko przebiegło pomyślnie, zwracamy statystyki użytkownika
    res.status(200).json(userStats);
  } catch (error) {
    // Obsługa błędów
    console.error("Błąd podczas pobierania statystyk użytkownika:", error);
    res.status(500).json({
      message: "Wystąpił błąd podczas pobierania statystyk użytkownika.",
    });
  }
};
