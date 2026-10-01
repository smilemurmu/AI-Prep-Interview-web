import {
  BarChart3,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import { interviewService } from "../services/interviewService";

export default function Progress() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    averageScore: 0,
    bestScore: 0,
  });

  useEffect(() => {
    interviewService
      .stats()
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="page-container">
      <header className="mb-7">
        <h1 className="text-3xl font-bold">
          Your Progress
        </h1>

        <p className="mt-2 text-slate-500">
          See how your interview practice is developing.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <StatCard
          icon={CheckCircle2}
          title="Completed"
          value={stats.completed}
        />

        <StatCard
          icon={BarChart3}
          title="Total Attempts"
          value={stats.total}
        />
      </section>

      <section className="card mt-6 p-7">
        <h2 className="text-xl font-bold">
          Performance Overview
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your current statistics are calculated from
          completed interviews.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">
          <BarChart3
            className="mx-auto text-primary-600"
            size={38}
          />

          <h3 className="mt-4 font-bold">
            {stats.completed
              ? "Keep practicing"
              : "Complete your first interview"}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {stats.completed
              ? "More completed interviews will give you a stronger performance trend."
              : "Your progress dashboard will become more useful after your first completed session."}
          </p>
        </div>
      </section>
    </div>
  );
}
