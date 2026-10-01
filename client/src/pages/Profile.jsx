import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    projects: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      email: user.email || "",
      skills: (user.skills || []).join(", "),
      projects: (user.projects || []).join("\n"),
    });
  }, [user]);

  async function save(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await authService.updateProfile({
        name: form.name,
        email: form.email,
        skills: form.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        projects: form.projects
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      setUser(data.user);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-container max-w-3xl">
      <header className="mb-7">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Keep your skills and projects ready for
          resume-based practice.
        </p>
      </header>

      <section className="card p-6 sm:p-8">
        <form onSubmit={save} className="space-y-5">
          <Field
            label="Name"
            value={form.name}
            onChange={(value) =>
              setForm({ ...form, name: value })
            }
          />

          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) =>
              setForm({ ...form, email: value })
            }
          />

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Skills
            </label>

            <input
              className="input"
              placeholder="React, Node.js, MongoDB, Python"
              value={form.skills}
              onChange={(e) =>
                setForm({
                  ...form,
                  skills: e.target.value,
                })
              }
            />

            <p className="mt-1 text-xs text-slate-400">
              Separate skills with commas.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Projects
            </label>

            <textarea
              className="input min-h-32"
              placeholder="Movie App
Interview Platform
E-commerce App"
              value={form.projects}
              onChange={(e) =>
                setForm({
                  ...form,
                  projects: e.target.value,
                })
              }
            />

            <p className="mt-1 text-xs text-slate-400">
              Put one project on each line.
            </p>
          </div>

          {message && (
            <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button className="btn-primary">
            Save Profile
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        className="input"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}
