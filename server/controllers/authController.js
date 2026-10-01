const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    skills: user.skills,
    projects: user.projects,
    createdAt: user.createdAt,
  };
}

function createToken(userId) {
  return jwt.sign(
    { id: String(userId) },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must contain at least 6 characters.",
    });
  }

  const normalizedEmail = email
    .toLowerCase()
    .trim();

  const exists = await User.findOne({
    email: normalizedEmail,
  });

  if (exists) {
    return res.status(409).json({
      message: "User already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    12
  );

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  res.status(201).json({
    token: createToken(user._id),
    user: publicUser(user),
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: String(email || "")
      .toLowerCase()
      .trim(),
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  const valid = await bcrypt.compare(
    password || "",
    user.password
  );

  if (!valid) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  res.json({
    token: createToken(user._id),
    user: publicUser(user),
  });
}

async function me(req, res) {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  res.json({ user: publicUser(user) });
}

async function updateProfile(req, res) {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  if (req.body.name) {
    user.name = req.body.name.trim();
  }

  if (req.body.email) {
    user.email = req.body.email
      .toLowerCase()
      .trim();
  }

  if (Array.isArray(req.body.skills)) {
    user.skills = req.body.skills;
  }

  if (Array.isArray(req.body.projects)) {
    user.projects = req.body.projects;
  }

  await user.save();

  res.json({
    user: publicUser(user),
  });
}

module.exports = {
  signup,
  login,
  me,
  updateProfile,
};
