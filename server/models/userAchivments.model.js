import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Dodaj inne pola dla osiągnięcia
});

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
