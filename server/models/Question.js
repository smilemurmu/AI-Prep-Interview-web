const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "HR",
        "Technical",
        "Project",
        "Behavioral",
        "Aptitude",
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    role: {
      type: String,
      default: "General",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);
