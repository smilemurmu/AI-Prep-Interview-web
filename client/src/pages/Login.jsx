import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue your interview preparation."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Email
          </label>

          <input
            required
            type="email"
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Password
          </label>

          <div className="relative">
            <input
              required
              minLength={6}
              type={showPassword ? "text" : "password"}
              className="input pr-12"
              placeholder="Your password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((value) => !value)
              }
              className="absolute right-3 top-3 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-primary-600"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-primary-50 via-white to-cyan-50 p-5">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-soft sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-600 text-white">
            <Sparkles size={21} />
          </span>

          <div>
            <strong className="block text-lg">
              Interview Prep
            </strong>
            <span className="text-xs text-slate-400">
              Practice with confidence
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mb-7 mt-2 text-sm text-slate-500">
          {subtitle}
        </p>

        {children}
      </section>
    </main>
  );
}
