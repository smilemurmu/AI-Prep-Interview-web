import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-6xl font-bold text-primary-600">
          404
        </p>

        <h1 className="mt-3 text-2xl font-bold">
          Page not found
        </h1>

        <Link
          to="/dashboard"
          className="btn-primary mt-6"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
