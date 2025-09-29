import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import api from "../config/api"
import { useAuth } from "../context/AuthContext"
import Confetti from "react-confetti"  // 🎉 for completion celebration
import "./Profile.css"

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", enrolledCourses: [] })
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState("enrolled")
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, coursesResponse] = await Promise.all([
          api.get("/auth/profile"),
          api.get("/courses"),
        ])

        const updatedEnrolledCourses = profileResponse.data.enrolledCourses.map((enrollment) => ({
          ...enrollment,
          progress: Math.floor(Math.random() * 51), // start with partial progress
        }))

        setProfile({
          ...profileResponse.data,
          enrolledCourses: updatedEnrolledCourses,
        })
        setCourses(coursesResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEnroll = async (courseId) => {
    try {
      const response = await api.post(`/courses/enroll/${courseId}`)

      let courseData = response.data.course
      if (!courseData) {
        const courseResponse = await api.get(`/courses/${courseId}`)
        courseData = courseResponse.data
      }

      setProfile((prevProfile) => ({
        ...prevProfile,
        enrolledCourses: [...prevProfile.enrolledCourses, { course: courseData, progress: 0 }],
      }))
    } catch (error) {
      console.error("Error enrolling in course:", error)
    }
  }

  const handleUpdateProgress = async (courseId, progress) => {
    try {
      setProfile((prevProfile) => ({
        ...prevProfile,
        enrolledCourses: prevProfile.enrolledCourses.map((enrollment) =>
          enrollment.course && enrollment.course._id === courseId
            ? { ...enrollment, progress }
            : enrollment
        ),
      }))

      if (progress === 100) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000) // confetti disappears
      }

      await api.put(`/courses/progress/${courseId}`, { progress })
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="loading-text">Loading...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && <Confetti />}

      <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
        Profile
      </motion.h1>

      <div className="profile-info">
        <p>Email: {profile.email}</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "enrolled" ? "active" : ""}`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`tab-button ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          Available Courses
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "enrolled" && (
          <motion.div
            key="enrolled"
            className="enrolled-courses"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h2>Enrolled Courses</h2>
            {profile.enrolledCourses.length === 0 && <p>No enrolled courses yet.</p>}
            {profile.enrolledCourses.map((enrollment) =>
              enrollment.course ? (
                <motion.div
                  key={enrollment.course._id}
                  className="course-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3>{enrollment.course.title}</h3>

                  {/* Animated Progress Bar */}
                  <div className="progress-container">
                    <motion.div
                      className="progress-bar"
                      initial={{ width: "0%" }}
                      animate={{ width: `${enrollment.progress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <span className="progress-text">{enrollment.progress}%</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={enrollment.progress}
                    onChange={(e) =>
                      handleUpdateProgress(enrollment.course._id, Number.parseInt(e.target.value))
                    }
                  />

                  {/* Milestone Badges */}
                  {enrollment.progress >= 100 && <span className="badge">🏆 Completed</span>}
                  {enrollment.progress >= 50 && enrollment.progress < 100 && (
                    <span className="badge silver">⭐ Halfway There</span>
                  )}
                </motion.div>
              ) : null
            )}
          </motion.div>
        )}

        {activeTab === "available" && (
          <motion.div
            key="available"
            className="available-courses"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h2>Available Courses</h2>
            {courses
              .filter((course) => !profile.enrolledCourses.some((ec) => ec.course && ec.course._id === course._id))
              .map((course) => (
                <motion.div
                  key={course._id}
                  className="course-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button onClick={() => handleEnroll(course._id)} className="button enroll-button">
                    Enroll
                  </button>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Profile