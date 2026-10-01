const express = require("express");

const {
  listQuestions,
  getCategories,
  getQuestion,
} = require("../controllers/questionController");

const auth = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.use(auth);

router.get(
  "/",
  asyncHandler(listQuestions)
);

router.get(
  "/categories",
  asyncHandler(getCategories)
);

router.get(
  "/:id",
  asyncHandler(getQuestion)
);

module.exports = router;
