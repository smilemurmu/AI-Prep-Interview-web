import {
  CheckCircle2,
  History,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { interviewService } from "../services/interviewService";

export default function InterviewResult() {
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
        Loading result...
      </div>
    );
  }

  return (
    <div className="page-container max-w-4xl">
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-700 to-cyan-500 p-8 text-center text-white">
          <CheckCircle2
            className="mx-auto"
            size={48}
          />

          <h1 className="mt-4 text-3xl font-bold">
            Interview Completed
          </h1>

          <p className="mt-2 text-white/80">
            Your answers have been saved successfully.
          </p>
        </div>

        <div className="p-7 text-center">
          <p className="text-sm text-slate-500">
            Current score
          </p>

          <p className="mt-2 text-5xl font-bold text-primary-600">
            {interview.score == null
              ? "—"
              : `${interview.score}%`}
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-500">
            AI/ML evaluation is not enabled in this
            version. Your interview, questions and answers
            are stored for review.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() =>
                navigate(`/history/${id}`)
              }
              className="btn-secondary"
            >
              <History size={17} />
              Review Answers
            </button>

            <button
              onClick={() => navigate("/interview")}
              className="btn-primary"
            >
              <Play size={17} />
              Practice Again
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
