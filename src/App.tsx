import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { Dashboard } from "./pages/Dashboard";
import { QuizList } from "./pages/QuizList";
import { QuizAttempt } from "./pages/QuizAttempt";
import { QuizResult } from "./pages/QuizResult";
import { Leaderboard } from "./pages/Leaderboard";
import { ProfilePage } from "./pages/ProfilePage";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { QuestionManagement } from "./pages/admin/QuestionManagement";
import { QuizManagement } from "./pages/admin/QuizManagement";
import { CategoryManagement } from "./pages/admin/CategoryManagement";
import { ReportsPage } from "./pages/admin/ReportsPage";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminProfilePage } from "./pages/admin/AdminProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/Auth Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizAttempt />} />
        <Route path="/result" element={<QuizResult />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<QuestionManagement />} />
        <Route path="/admin/quizzes" element={<QuizManagement />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
