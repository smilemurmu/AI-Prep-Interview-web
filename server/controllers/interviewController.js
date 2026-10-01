const Interview = require("../models/Interview");
const {
  createInterview,
  calculateStats,
} = require("../services/interviewService");

async function create(req, res) {
  const interview = await createInterview({
    userId: req.user.id,
    ...req.body,
  });

  res.status(201).json({ interview });
}

async function list(req, res) {
  const interviews = await Interview.find({
    user: req.user.id,
  })
    .populate("questions")
    .sort({ createdAt: -1 });

  res.json({ interviews });
}

async function getOne(req, res) {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user.id,
  }).populate("questions");

  if (!interview) {
    return res.status(404).json({
      message: "Interview not found.",
    });
  }

  res.json({ interview });
}

async function stats(req, res) {
  const data = await calculateStats(req.user.id);
  res.json(data);
}

async function saveAnswer(req, res) {
  const {
    questionId,
    answer,
  } = req.body;

  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!interview) {
    return res.status(404).json({
      message: "Interview not found.",
    });
  }

  const existing = interview.answers.find(
    (item) =>
      String(item.question) ===
      String(questionId)
  );

  if (existing) {
    existing.answer = answer || "";
  } else {
    interview.answers.push({
      question: questionId,
      answer: answer || "",
    });
  }

  await interview.save();

  res.json({
    message: "Answer saved successfully.",
  });
}

async function complete(req, res) {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!interview) {
    return res.status(404).json({
      message: "Interview not found.",
    });
  }

  /*
    AI/ML evaluation is intentionally omitted.
    We mark the interview complete but leave score null.
  */

  interview.status = "completed";
  interview.completedAt = new Date();

  await interview.save();

  res.json({ interview });
}

async function remove(req, res) {
  const result = await Interview.deleteOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!result.deletedCount) {
    return res.status(404).json({
      message: "Interview not found.",
    });
  }

  res.json({
    message: "Interview deleted successfully.",
  });
}

module.exports = {
  create,
  list,
  getOne,
  stats,
  saveAnswer,
  complete,
  remove,
};
