import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import MachineLearningCourse from "./pages/courses/MachineLearningCourse";
import ReactCourse from "./pages/courses/ReactCourse";
import DisasterAwarenessCourse from "./pages/courses/DisasterAwarenessCourse"; 
import EmergencyPreparednessCourse from "./pages/courses/EmergencyPreparednessCourse";
import FirstAidTrainingCourse from "./pages/courses/FirstAidTrainingCourse";
import GamifiedLearning from "./pages/GamifiedLearning";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import VideoPlayer from "./components/VideoPlayer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Quizzes from "./pages/Quizzes";
import Quiz from "./pages/Quiz";
import "./App.css";
import Alerts from "./pages/Alerts";
import ShortVideoPlayer from "./components/ShortVideoPlayer";
import EmergencyToolkit from "./pages/EmergencyToolkit";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth?mode=login" state={{ message: "Please log in" }} />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quizzes/:quizId" element={<Quiz />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/e-reels" element={<ShortVideoPlayer />} />
              <Route path="/toolkit" element={<EmergencyToolkit />} />

              {/* Protected */}
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/gamified-learning" element={<ProtectedRoute><GamifiedLearning /></ProtectedRoute>} />
              <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />

              {/* Course Pages */}
              <Route path="/courses/machine-learning" element={<ProtectedRoute><MachineLearningCourse /></ProtectedRoute>} />
              <Route path="/courses/react" element={<ProtectedRoute><ReactCourse /></ProtectedRoute>} />
              <Route path="/courses/disaster-awareness" element={<ProtectedRoute><DisasterAwarenessCourse /></ProtectedRoute>} />
              <Route path="/courses/emergency-preparedness" element={<ProtectedRoute><EmergencyPreparednessCourse /></ProtectedRoute>} />
              <Route path="/courses/first-aid-training" element={<ProtectedRoute><FirstAidTrainingCourse /></ProtectedRoute>} />

              {/* Video Pages */}
              <Route path="/courses/:courseId/video/:videoId" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
            </Routes>
          </main>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;