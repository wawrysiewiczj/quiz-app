import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length === 4;
      },
      message: "Exactly 4 answers are required",
    },
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
