import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "uncategrized",
      unique: true,
      required: true,
    },
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        default: [],
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },

  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
