const Interview = require("../models/Interview");
const Question = require("../models/Question");

async function selectQuestions({
  category,
  difficulty,
  targetRole,
  limit,
}) {
  const filter = {
    active: true,
  };

  if (category && category !== "Mixed") {
    filter.category = category;
  }

  if (difficulty && difficulty !== "Mixed") {
    filter.difficulty = difficulty;
  }

  if (targetRole) {
    filter.$or = [
      {
        role: {
          $regex: targetRole,
          $options: "i",
        },
      },
      { role: "General" },
    ];
  }

  let questions = await Question.find(filter)
    .sort({ createdAt: 1 })
    .limit(limit);

  // Fallback if a narrow filter does not have enough data.
  if (questions.length < limit) {
    const fallback = await Question.find({
      active: true,
    })
      .sort({ createdAt: 1 })
      .limit(limit);

    questions = [
      ...questions,
      ...fallback.filter(
        (candidate) =>
          !questions.some(
            (item) =>
              String(item._id) ===
              String(candidate._id)
          )
      ),
    ].slice(0, limit);
  }

  return questions;
}

async function createInterview({
  userId,
  mode,
  targetRole,
  targetCompany,
  category,
  difficulty,
  questionCount,
}) {
  const limit = Math.min(
    Math.max(Number(questionCount) || 5, 1),
    20
  );

  const questions = await selectQuestions({
    category,
    difficulty,
    targetRole,
    limit,
  });

  if (!questions.length) {
    const error = new Error(
      "No interview questions are available. Run npm run seed."
    );

    error.statusCode = 400;
    throw error;
  }

  const interview = await Interview.create({
    user: userId,
    mode: mode || "resume",
    targetRole: targetRole || "",
    targetCompany: targetCompany || "",
    category: category || "Mixed",
    difficulty: difficulty || "Mixed",
    questions: questions.map(
      (question) => question._id
    ),
    answers: questions.map((question) => ({
      question: question._id,
      answer: "",
    })),
    status: "in_progress",
    startedAt: new Date(),
  });

  return Interview.findById(interview._id).populate(
    "questions"
  );
}

async function calculateStats(userId) {
  const interviews = await Interview.find({
    user: userId,
  }).lean();

  const completed = interviews.filter(
    (item) => item.status === "completed"
  );

  const scores = completed
    .map((item) => item.score)
    .filter((score) => typeof score === "number");

  const averageScore = scores.length
    ? scores.reduce((sum, score) => sum + score, 0) /
      scores.length
    : 0;

  const bestScore = scores.length
    ? Math.max(...scores)
    : 0;

  return {
    total: interviews.length,
    completed: completed.length,
    averageScore: Number(
      averageScore.toFixed(1)
    ),
    bestScore: Number(bestScore.toFixed(1)),
  };
}

module.exports = {
  createInterview,
  calculateStats,
};
