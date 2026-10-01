import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import QuestionCard from "../components/QuestionCard";
import { interviewService } from "../services/interviewService";
import { useInterview } from "../context/InterviewContext";

export default function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setCurrentInterview,
  } = useInterview();

  const [interview, setInterview] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    interviewService
      .getById(id)
      .then(({ interview }) => {
        setInterview(interview);
        setCurrentInterview(interview);

        const answerMap = {};

        interview.answers?.forEach((item) => {
          answerMap[String(item.question)] =
            item.answer || "";
        });

        setAnswers(answerMap);

        const firstQuestion =
          interview.questions[0];

        setAnswer(
          answerMap[String(firstQuestion?._id)] || ""
        );
      })
      .catch(() => navigate("/history"));
  }, [id, navigate, setCurrentInterview]);

  if (!interview) {
    return (
      <div className="page-container">
        <p>Loading interview...</p>
      </div>
    );
  }

  const question =
    interview.questions[currentQuestionIndex];

  const isLast =
    currentQuestionIndex ===
    interview.questions.length - 1;

  function updateAnswer(value) {
    setAnswer(value);

    setAnswers((previous) => ({
      ...previous,
      [String(question._id)]: value,
    }));
  }

  async function saveCurrentAnswer() {
    await interviewService.saveAnswer(id, {
      questionId: question._id,
      answer,
    });
  }

  async function nextQuestion() {
    setSaving(true);

    try {
      await saveCurrentAnswer();

      if (isLast) {
        await interviewService.complete(id);
        navigate(`/interview/${id}/result`);
        return;
      }

      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion =
        interview.questions[nextIndex];

      setCurrentQuestionIndex(nextIndex);

      setAnswer(
        answers[String(nextQuestion._id)] || ""
      );
    } catch (err) {
      window.alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex === 0) return;

    const previousIndex =
      currentQuestionIndex - 1;

    const previousQuestion =
      interview.questions[previousIndex];

    setCurrentQuestionIndex(previousIndex);

    setAnswer(
      answers[String(previousQuestion._id)] || ""
    );
  }

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/history")}
          className="rounded-xl bg-white p-3 shadow-sm"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <p className="font-bold">
            {interview.targetRole ||
              "Interview Practice"}
          </p>

          <p className="text-xs text-slate-400">
            {interview.mode} interview
          </p>
        </div>

        <span className="ml-auto flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-500 shadow-sm">
          <Clock3 size={14} />
          {currentQuestionIndex + 1} /{" "}
          {interview.questions.length}
        </span>
      </div>

      <QuestionCard
        question={question}
        number={currentQuestionIndex + 1}
        answer={answer}
        onChange={updateAnswer}
      />

      <div className="mt-5 flex justify-between gap-3">
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="btn-secondary"
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={saving}
          className="btn-primary"
        >
          {isLast ? "Finish Interview" : "Next"}
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
