import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { interviewService } from "../services/interviewService";

export default function HistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    interviewService
      .getById(id)
      .then(({ interview }) => setInterview(interview))
      .catch(() => navigate("/history"));
  }, [id, navigate]);

  if (!interview) {
    return (
      <div className="page-container">
        Loading...
      </div>
    );
  }

  return (
    <div className="page-container max-w-4xl">
      <button
        onClick={() => navigate("/history")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft size={17} />
        Back to history
      </button>

      <section className="card mb-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Interview
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              {interview.targetRole ||
                "General Interview"}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {interview.mode} • {interview.status}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-400">
              Score
            </p>
            <strong className="text-3xl text-primary-600">
              {interview.score == null
                ? "—"
                : `${interview.score}%`}
            </strong>
          </div>
        </div>
      </section>

      <div className="space-y-5">
        {interview.questions.map(
          (question, index) => {
            const answer =
              interview.answers?.find(
                (item) =>
                  String(item.question) ===
                  String(question._id)
              );

            return (
              <article
                key={question._id}
                className="card p-6"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                  Question {index + 1}
                </span>

                <h2 className="mt-3 text-lg font-bold">
                  {question.text}
                </h2>

                <div className="mt-5 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {answer?.answer ||
                    "No answer submitted."}
                </div>

                {answer?.score != null && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-600">
                    <CheckCircle2 size={17} />
                    Score: {answer.score}%
                  </p>
                )}
              </article>
            );
          }
        )}
      </div>
    </div>
  );
}
