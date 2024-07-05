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
        return arr.length === 4; // Upewniamy się, że są dokładnie 4 odpowiedzi
      },
      message: "Dokładnie 4 odpowiedzi są wymagane",
    },
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3, // Indeks odpowiedzi (0-3), która jest poprawna
  },
});

const userQuizSchema = new mongoose.Schema(
  {
    madeById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Referencja do modelu Category
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (arr) {
          return arr.length === 10; // Upewniamy się, że są dokładnie 10 pytań
        },
        message: "Dokładnie 10 pytań są wymagane",
      },
    },
  },
  { timestamps: true }
);

const UserQuiz = mongoose.model("UserQuiz", userQuizSchema);

export default UserQuiz;
