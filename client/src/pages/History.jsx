import {
  Eye,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmptyState from "../components/EmptyState";
import { interviewService } from "../services/interviewService";

export default function History() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await interviewService.list();
      setInterviews(data.interviews);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm("Delete this interview?")) {
      return;
    }

    try {
      await interviewService.remove(id);

      setInterviews((items) =>
        items.filter((item) => item._id !== id)
      );
    } catch (err) {
      window.alert(err.message);
    }
  }

  return (
    <div className="page-container">
      <header className="mb-7">
        <h1 className="text-3xl font-bold">
          Interview History
        </h1>

        <p className="mt-2 text-slate-500">
          Review every practice session and submitted
          answer.
        </p>
      </header>

      {loading ? (
        <div className="card p-10 text-center">
          Loading...
        </div>
      ) : interviews.length === 0 ? (
        <EmptyState
          icon={Eye}
          title="No interviews yet"
          description="Start your first practice interview and it will appear here."
          action={
            <button
              onClick={() => navigate("/interview")}
              className="btn-primary"
            >
              Start Interview
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          {interviews.map((item) => (
            <article
              key={item._id}
              className="card flex flex-wrap items-center gap-4 p-5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <Eye size={20} />
              </div>

              <div className="min-w-48 flex-1">
                <h2 className="font-bold">
                  {item.targetRole ||
                    "General Interview"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {item.mode} • {item.status} •{" "}
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <strong className="text-lg text-primary-600">
                {item.score == null
                  ? "—"
                  : `${item.score}%`}
              </strong>

              <button
                onClick={() =>
                  navigate(`/history/${item._id}`)
                }
                className="btn-secondary"
              >
                <Eye size={16} />
                View
              </button>

              <button
                onClick={() => remove(item._id)}
                className="btn-danger px-3"
              >
                <Trash2 size={16} />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
