import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { questionService } from "../services/questionService";

export default function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] =
    useState("All");
  const [loading, setLoading] = useState(true);

  async function loadQuestions() {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (category !== "All") {
        params.set("category", category);
      }

      if (difficulty !== "All") {
        params.set("difficulty", difficulty);
      }

      const data = await questionService.list(
        params.toString()
          ? `?${params.toString()}`
          : ""
      );

      setQuestions(data.questions);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, [category, difficulty]);

  const visibleQuestions = questions.filter(
    (question) =>
      question.text
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <header className="mb-7">
        <h1 className="text-3xl font-bold">
          Question Bank
        </h1>

        <p className="mt-2 text-slate-500">
          Browse the interview questions stored in
          MongoDB.
        </p>
      </header>

      <section className="card mb-5 grid gap-4 p-5 md:grid-cols-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            className="input pl-10"
            placeholder="Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          className="input"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>
          <option>HR</option>
          <option>Technical</option>
          <option>Project</option>
          <option>Behavioral</option>
          <option>Aptitude</option>
        </select>

        <select
          className="input"
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </section>

      {loading ? (
        <div className="card p-10 text-center">
          Loading questions...
        </div>
      ) : (
        <div className="grid gap-4">
          {visibleQuestions.map((question, index) => (
            <article
              key={question._id}
              className="card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                  Question {index + 1}
                </span>

                <div className="flex gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                    {question.category}
                  </span>

                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-600">
                    {question.difficulty}
                  </span>
                </div>
              </div>

              <h2 className="mt-4 font-semibold leading-6">
                {question.text}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Role: {question.role}
              </p>
            </article>
          ))}

          {!visibleQuestions.length && (
            <div className="card p-10 text-center text-sm text-slate-400">
              No questions found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
