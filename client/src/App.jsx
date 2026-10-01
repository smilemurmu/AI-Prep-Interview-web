import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewSession from "./pages/InterviewSession";
import InterviewResult from "./pages/InterviewResult";
import History from "./pages/History";
import HistoryDetails from "./pages/HistoryDetails";
import Progress from "./pages/Progress";
import QuestionBank from "./pages/QuestionBank";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/interview"
            element={<InterviewSetup />}
          />

          <Route
            path="/interview/:id"
            element={<InterviewSession />}
          />

          <Route
            path="/interview/:id/result"
            element={<InterviewResult />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/history/:id"
            element={<HistoryDetails />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/questions"
            element={<QuestionBank />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}
