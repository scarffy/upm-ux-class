import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./components/Login/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import AcademicDashboard from "./components/Student/AcademicDashboard";
import ThesisSubmission from "./components/Student/ThesisSubmission";
import VivaSchedule from "./components/Student/VivaSchedule";
import ProgressReports from "./components/Student/ProgressReports";
import FinancialDashboard from "./components/Student/FinancialDashboard";
import GraduationDashboard from "./components/Student/GraduationDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import SupervisorDashboard from "./components/Supervisor/SupervisorDashboard";
import Reviews from "./components/Supervisor/Reviews";
import Messages from "./components/Student/Messages";
import HelpSupport from "./components/Student/HelpSupport";
import "./App.css";

// Auto-login wrapper for demo purposes
function AutoLoginWrapper({ children }: { children: React.ReactNode }) {
  const { user, autoLogin } = useUser();
  const location = useLocation();

  useEffect(() => {
    // Auto-login based on URL path for demo
    if (!user) {
      const path = location.pathname;
      if (path.startsWith("/admin")) {
        autoLogin("admin");
      } else if (path.startsWith("/supervisor")) {
        autoLogin("supervisor");
      } else if (path.startsWith("/student")) {
        autoLogin("student");
      }
    }
  }, [location.pathname, user, autoLogin]);

  return <>{children}</>;
}

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <AutoLoginWrapper>
            <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route
                  path="/student/academic"
                  element={<AcademicDashboard />}
                />
                <Route path="/student/thesis" element={<ThesisSubmission />} />
                <Route path="/student/viva" element={<VivaSchedule />} />
                <Route path="/student/progress" element={<ProgressReports />} />
                <Route
                  path="/student/financial"
                  element={<FinancialDashboard />}
                />
                <Route
                  path="/student/graduation"
                  element={<GraduationDashboard />}
                />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/supervisor" element={<SupervisorDashboard />} />
                <Route path="/supervisor/reviews" element={<Reviews />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/support" element={<HelpSupport />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </AutoLoginWrapper>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
