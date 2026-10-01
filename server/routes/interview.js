const express = require("express");

const {
  create,
  list,
  getOne,
  stats,
  saveAnswer,
  complete,
  remove,
} = require("../controllers/interviewController");

const auth = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.use(auth);

router.post(
  "/",
  asyncHandler(create)
);

router.get(
  "/",
  asyncHandler(list)
);

router.get(
  "/stats",
  asyncHandler(stats)
);

router.get(
  "/:id",
  asyncHandler(getOne)
);

router.put(
  "/:id/answers",
  asyncHandler(saveAnswer)
);

router.put(
  "/:id/complete",
  asyncHandler(complete)
);

router.delete(
  "/:id",
  asyncHandler(remove)
);

module.exports = router;
