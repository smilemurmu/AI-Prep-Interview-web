require("dotenv").config();

const mongoose = require("mongoose");
const Question = require("../models/Question");

const questions = [
  {
    text: "Tell me about yourself.",
    category: "HR",
    difficulty: "Easy",
    role: "General",
    tags: ["introduction"],
  },
  {
    text: "Why did you choose Computer Science and Engineering?",
    category: "HR",
    difficulty: "Easy",
    role: "General",
    tags: ["motivation"],
  },
  {
    text: "Why should we hire you?",
    category: "HR",
    difficulty: "Medium",
    role: "General",
    tags: ["strengths"],
  },
  {
    text: "Where do you see yourself in five years?",
    category: "HR",
    difficulty: "Easy",
    role: "General",
    tags: ["career"],
  },
  {
    text: "What are your strengths and weaknesses?",
    category: "HR",
    difficulty: "Medium",
    role: "General",
    tags: ["self-awareness"],
  },
  {
    text: "Explain the difference between SQL and NoSQL databases.",
    category: "Technical",
    difficulty: "Medium",
    role: "Software Developer",
    tags: ["database"],
  },
  {
    text: "What is a REST API?",
    category: "Technical",
    difficulty: "Easy",
    role: "Full Stack Developer",
    tags: ["api"],
  },
  {
    text: "What is middleware in Express.js?",
    category: "Technical",
    difficulty: "Medium",
    role: "Backend Developer",
    tags: ["node", "express"],
  },
  {
    text: "What is the difference between props and state in React?",
    category: "Technical",
    difficulty: "Medium",
    role: "Frontend Developer",
    tags: ["react"],
  },
  {
    text: "What is useEffect used for in React?",
    category: "Technical",
    difficulty: "Medium",
    role: "Frontend Developer",
    tags: ["react", "hooks"],
  },
  {
    text: "Explain JWT authentication.",
    category: "Technical",
    difficulty: "Hard",
    role: "Full Stack Developer",
    tags: ["jwt", "security"],
  },
  {
    text: "Why should passwords be hashed with bcrypt?",
    category: "Technical",
    difficulty: "Medium",
    role: "Backend Developer",
    tags: ["security"],
  },
  {
    text: "How do you connect a Node.js application to MongoDB?",
    category: "Technical",
    difficulty: "Easy",
    role: "Backend Developer",
    tags: ["mongodb", "mongoose"],
  },
  {
    text: "What is Mongoose and why is it useful?",
    category: "Technical",
    difficulty: "Medium",
    role: "Backend Developer",
    tags: ["mongodb"],
  },
  {
    text: "Explain 1NF, 2NF and 3NF.",
    category: "Technical",
    difficulty: "Medium",
    role: "Software Developer",
    tags: ["dbms"],
  },
  {
    text: "Describe one of your projects and explain your contribution.",
    category: "Project",
    difficulty: "Easy",
    role: "General",
    tags: ["project"],
  },
  {
    text: "What was the most difficult problem you faced in a project?",
    category: "Project",
    difficulty: "Medium",
    role: "General",
    tags: ["problem-solving"],
  },
  {
    text: "How would you design an interview platform backend?",
    category: "Project",
    difficulty: "Hard",
    role: "Full Stack Developer",
    tags: ["architecture"],
  },
  {
    text: "Tell me about a time you disagreed with a teammate.",
    category: "Behavioral",
    difficulty: "Medium",
    role: "General",
    tags: ["teamwork"],
  },
  {
    text: "Tell me about a mistake you made and what you learned.",
    category: "Behavioral",
    difficulty: "Medium",
    role: "General",
    tags: ["growth"],
  },
  {
    text: "How do you handle pressure before an important deadline?",
    category: "Behavioral",
    difficulty: "Medium",
    role: "General",
    tags: ["pressure"],
  },
  {
    text: "What is the time complexity of binary search?",
    category: "Aptitude",
    difficulty: "Easy",
    role: "Software Developer",
    tags: ["dsa"],
  },
  {
    text: "If a train travels 120 km in 2 hours, what is its average speed?",
    category: "Aptitude",
    difficulty: "Easy",
    role: "General",
    tags: ["quantitative"],
  },
  {
    text: "A project has 20 tasks and 15 are complete. What percentage is complete?",
    category: "Aptitude",
    difficulty: "Easy",
    role: "General",
    tags: ["percentage"],
  },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing from server/.env"
    );
  }

  await mongoose.connect(process.env.MONGO_URI);

  await Question.deleteMany({});
  await Question.insertMany(questions);

  console.log(
    `Inserted ${questions.length} questions.`
  );

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
