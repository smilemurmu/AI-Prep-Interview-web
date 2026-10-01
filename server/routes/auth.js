const express = require("express");

const {
  signup,
  login,
  me,
  updateProfile,
} = require("../controllers/authController");

const auth = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));

router.get(
  "/me",
  auth,
  asyncHandler(me)
);

router.put(
  "/profile",
  auth,
  asyncHandler(updateProfile)
);

module.exports = router;
