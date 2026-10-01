require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const interviewRoutes = require("./routes/interview");

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Interview Platform API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/interviews", interviewRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message:
      err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing from server/.env"
    );
  }

  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is missing from server/.env"
    );
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
