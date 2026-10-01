const Question = require("../models/Question");

async function listQuestions(req, res) {
  const {
    category,
    difficulty,
    role,
  } = req.query;

  const filter = {
    active: true,
  };

  if (category) {
    filter.category = category;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  if (role) {
    filter.role = {
      $regex: role,
      $options: "i",
    };
  }

  const questions = await Question.find(filter)
    .sort({ createdAt: 1 });

  res.json({ questions });
}

async function getCategories(req, res) {
  const categories = await Question.distinct(
    "category",
    { active: true }
  );

  res.json({ categories });
}

async function getQuestion(req, res) {
  const question = await Question.findById(
    req.params.id
  );

  if (!question) {
    return res.status(404).json({
      message: "Question not found.",
    });
  }

  res.json({ question });
}

module.exports = {
  listQuestions,
  getCategories,
  getQuestion,
};
