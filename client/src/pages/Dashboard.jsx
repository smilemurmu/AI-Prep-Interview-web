import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileText,
  Play,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import { interviewService } from "../services/interviewService";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    averageScore: 0,
    bestScore: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    Promise.all([
      interviewService.stats(),
      interviewService.list(),
    ])
      .then(([statsData, interviewData]) => {
        setStats(statsData);
        setRecent(interviewData.interviews.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="page-container">
      <section className="mb-6 rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-cyan-500 p-7 text-white sm:p-10">
        <p className="text-sm font-medium text-white/70">
          Welcome back
        </p>

        <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">
          Hi {user?.name}, let's turn practice into
          interview confidence.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80">
          Practice HR, technical, project and behavioral
          questions while keeping your progress organized.
        </p>

        <button
          onClick={() => navigate("/interview")}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary-700"
        >
          <Play size={17} fill="currentColor" />
          Start Interview
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Play}
          title="Total Interviews"
          value={stats.total}
        />

        <StatCard
          icon={CheckCircle2}
          title="Completed"
          value={stats.completed}
        />

        <StatCard
          icon={BarChart3}
          title="Average Score"
          value={`${stats.averageScore}%`}
        />

        <StatCard
          icon={Trophy}
          title="Best Score"
          value={`${stats.bestScore}%`}
        />
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <Feature
          icon={FileText}
          title="Resume-Based Preparation"
          description="Practice around your skills, projects and technical background."
          onClick={() => navigate("/interview?mode=resume")}
        />

        <Feature
          icon={Target}
          title="Targeted Interview"
          description="Select a target role and company for focused practice."
          onClick={() => navigate("/interview?mode=targeted")}
        />

        <Feature
          icon={BookOpen}
          title="Question Bank"
          description="Browse questions by category, difficulty and role."
          onClick={() => navigate("/questions")}
        />

        <Feature
          icon={BarChart3}
          title="Progress"
          description="Review completed interviews and your performance."
          onClick={() => navigate("/progress")}
        />
      </section>

      <section className="card mt-6 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Recent Interviews
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest practice sessions.
            </p>
          </div>

          <button
            onClick={() => navigate("/history")}
            className="text-sm font-semibold text-primary-600"
          >
            View all
          </button>
        </div>

        {recent.length ? (
          <div className="divide-y divide-slate-100">
            {recent.map((item) => (
              <button
                key={item._id}
                onClick={() =>
                  navigate(`/history/${item._id}`)
                }
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <div>
                  <p className="font-semibold">
                    {item.targetRole ||
                      "General Interview"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.mode} • {item.status}
                  </p>
                </div>

                <span className="font-bold text-primary-600">
                  {item.score == null
                    ? "—"
                    : `${item.score}%`}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-slate-400">
            No interviews yet. Start your first one.
          </p>
        )}
      </section>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="card flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
        <Icon size={21} />
      </span>

      <span>
        <strong className="block">{title}</strong>
        <span className="mt-1 block text-sm leading-5 text-slate-500">
          {description}
        </span>
      </span>
    </button>
  );
}
