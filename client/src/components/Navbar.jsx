import {
  Bell,
  LogOut,
  Menu,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-bold text-slate-900"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white">
              <Sparkles size={18} />
            </span>

            <span className="hidden sm:block">
              Interview Prep
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={20} />
          </button>

          {user && (
            <>
              <span className="hidden text-sm font-medium text-slate-600 md:block">
                Hi, {user.name}
              </span>

              <button
                onClick={logout}
                className="rounded-xl p-2 text-red-500 hover:bg-red-50"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
