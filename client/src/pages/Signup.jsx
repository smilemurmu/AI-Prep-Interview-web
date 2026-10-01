import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
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
      const data = await authService.signup(form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-primary-50 via-white to-cyan-50 p-5">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-soft sm:p-9">
        <div className="mb-7">
          <h1 className="text-3xl font-bold">
            Create account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Build your personal interview preparation
            workspace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Field
            label="Name"
            value={form.name}
            placeholder="Your name"
            onChange={(value) =>
              setForm({ ...form, name: value })
            }
          />

          <Field
            label="Email"
            type="email"
            value={form.email}
            placeholder="you@example.com"
            onChange={(value) =>
              setForm({ ...form, email: value })
            }
          />

          <Field
            label="Password"
            type="password"
            value={form.password}
            placeholder="At least 6 characters"
            onChange={(value) =>
              setForm({ ...form, password: value })
            }
          />

          <button
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary-600"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

function Field({
  label,
  type = "text",
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
        required
        type={type}
        minLength={type === "password" ? 6 : undefined}
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
