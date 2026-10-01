const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    // Reserved for a future manual/evaluation service.
    // AI/ML scoring is NOT implemented.
    score: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
  },
  { _id: true }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    mode: {
      type: String,
      enum: ["resume", "targeted"],
      default: "resume",
    },

    targetRole: {
      type: String,
      default: "",
      trim: true,
    },

    targetCompany: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      default: "Mixed",
    },

    difficulty: {
      type: String,
      default: "Mixed",
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    answers: {
      type: [answerSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["created", "in_progress", "completed"],
      default: "created",
    },

    score: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    startedAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);
