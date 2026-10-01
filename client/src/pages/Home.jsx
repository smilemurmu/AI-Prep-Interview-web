import { ArrowRight, BookOpen, CheckCircle2, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-cyan-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link to="/" className="text-xl font-bold">
          Interview Prep
        </Link>

        <div className="flex gap-2">
          <Link to="/login" className="btn-secondary">
            Login
          </Link>

          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="rounded-full bg-primary-100 px-4 py-2 text-xs font-bold text-primary-700">
            Full-Stack Interview Practice
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
            Prepare better.
            <br />
            Interview with confidence.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            Practice HR, technical, project, behavioral and
            aptitude questions in one organized platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="btn-primary">
              Start Preparing
              <ArrowRight size={17} />
            </Link>

            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>

        <div className="card p-7">
          <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-cyan-500 p-7 text-white">
            <Target size={35} />

            <h2 className="mt-6 text-2xl font-bold">
              One workspace for your preparation
            </h2>

            <ul className="mt-6 space-y-4 text-sm">
              <Feature text="Separate interview modes" />
              <Feature text="MongoDB-backed question bank" />
              <Feature text="Saved answers and history" />
              <Feature text="Progress statistics" />
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ text }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 size={18} />
      {text}
    </li>
  );
}
