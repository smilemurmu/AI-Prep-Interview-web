import {
  FileText,
  Target,
} from "lucide-react";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { interviewService } from "../services/interviewService";
import { useInterview } from "../context/InterviewContext";

export default function InterviewSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startInterview } = useInterview();

  const initialMode =
    new URLSearchParams(location.search).get("mode") ||
    "resume";

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("Mixed");
  const [difficulty, setDifficulty] =
    useState("Mixed");
  const [questionCount, setQuestionCount] =
    useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function start() {
    setError("");
    setLoading(true);

    try {
      const data = await interviewService.create({
        mode,
        targetRole: role,
        targetCompany: company,
        category,
        difficulty,
        questionCount,
      });

      startInterview(data.interview);
      navigate(`/interview/${data.interview._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container max-w-5xl">
      <header className="mb-7">
        <h1 className="text-3xl font-bold">
          Start an Interview
        </h1>
        <p className="mt-2 text-slate-500">
          Configure your practice session before you
          begin.
        </p>
      </header>

      <section className="card p-6 sm:p-8">
        <h2 className="text-xl font-bold">
          1. Choose interview mode
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ModeCard
            icon={FileText}
            title="Resume Based"
            description="Practice questions around your skills and projects."
            selected={mode === "resume"}
            onClick={() => setMode("resume")}
          />

          <ModeCard
            icon={Target}
            title="Targeted Interview"
            description="Practice for a specific role and company."
            selected={mode === "targeted"}
            onClick={() => setMode("targeted")}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">
            2. Interview details
          </h2>

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <Field
              label="Target role"
              value={role}
              placeholder="e.g. Full Stack Developer"
              onChange={setRole}
            />

            <Field
              label="Target company"
              value={company}
              placeholder="e.g. TCS, Infosys, Google"
              onChange={setCompany}
            />

            <Select
              label="Category"
              value={category}
              onChange={setCategory}
              options={[
                "Mixed",
                "HR",
                "Technical",
                "Project",
                "Behavioral",
                "Aptitude",
              ]}
            />

            <Select
              label="Difficulty"
              value={difficulty}
              onChange={setDifficulty}
              options={[
                "Mixed",
                "Easy",
                "Medium",
                "Hard",
              ]}
            />

            <Select
              label="Number of questions"
              value={questionCount}
              onChange={(value) =>
                setQuestionCount(Number(value))
              }
              options={[3, 5, 10, 15]}
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          onClick={start}
          className="btn-primary mt-7 w-full sm:w-auto"
        >
          {loading
            ? "Creating interview..."
            : "Begin Interview"}
        </button>
      </section>
    </div>
  );
}

function ModeCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-primary-500 bg-primary-50 ring-2 ring-primary-100"
          : "border-slate-200 hover:border-primary-200"
      }`}
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary-600 shadow-sm">
        <Icon size={20} />
      </span>

      <strong className="mt-4 block">{title}</strong>

      <span className="mt-2 block text-sm leading-5 text-slate-500">
        {description}
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <input
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <select
        className="input"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
