import {
  BarChart3,
  BookOpen,
  Clock3,
  Home,
  PlayCircle,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/interview", label: "Start Interview", icon: PlayCircle },
  { to: "/history", label: "Interview History", icon: Clock3 },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/questions", label: "Question Bank", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white px-4 py-6 transition-transform lg:static lg:z-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <strong>Menu</strong>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
