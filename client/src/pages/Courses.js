import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import api from "../config/api"
import "./Courses.css"

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses")
        setCourses(response.data)
        setFilteredCourses(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error.message)
        if (error.response && error.response.status === 401) {
          setError("Your session has expired. Please log in again.")
          logout()
          navigate("/auth?mode=login")
        } else {
          setError("Failed to fetch courses. Please try again later.")
        }
      }
    }
    fetchCourses()
  }, [logout, navigate])

  useEffect(() => {
    const results = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(results)
  }, [searchTerm, courses])

  const getCourseLink = (course) => {
    switch (course.title) {
      case "Disaster Awareness Basics":
        return "/courses/disaster-awareness"
      case "Emergency Preparedness Planning":
        return "/courses/emergency-preparedness"
      case "First Aid & Life-Saving Skills":
        return "/courses/first-aid-training"
      case "Virtual Disaster Drills":
        return "/courses/virtual-drills"
      case "Localized Disaster Awareness":
        return "/courses/localized-awareness"
      case "Emergency Communication Tools":
        return "/courses/communication-tools"
      case "Admin Preparedness Dashboard":
        return "/courses/admin-dashboard"
      default:
        return `/courses/${course._id}`
    }
  }

  // Updated image logic: use MongoDB image or fallback
  const getCourseImage = (course) => course.image || "/placeholder.svg"

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate("/auth?mode=login")
      return
    }

    try {
      await api.post(`/courses/enroll/${courseId}`)
      const enrolledCourse = courses.find((course) => course._id === courseId)
      const updatedCourses = courses.map((course) =>
        course._id === courseId ? { ...course, isEnrolled: true } : course
      )
      setCourses(updatedCourses)
      setFilteredCourses(updatedCourses)
      navigate(getCourseLink(enrolledCourse))
    } catch (error) {
      console.error("Error enrolling in course:", error)
      setError("Failed to enroll in the course. Please try again.")
    }
  }

  const getDifficultyClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="courses-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Disaster Management Modules
      </motion.h1>

      {error && <p className="error-message">{error}</p>}

      <div className="search-filter-container">
        <motion.input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      <AnimatePresence>
        <motion.div
          className="courses-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id}
              className="course-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={getCourseImage(course)}
                alt={course.title}
                className="course-image"
              />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <span className={`course-difficulty ${getDifficultyClass(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <p className="course-description">{course.description}</p>
                <div className="button-container">
                  {course.isEnrolled ? (
                    <Link to={getCourseLink(course)} className="btn btn-primary">
                      Continue Learning
                    </Link>
                  ) : (
                    <button onClick={() => handleEnroll(course._id)} className="btn btn-primary">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredCourses.length === 0 && !error && (
        <motion.p
          className="no-courses"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No courses found. Try adjusting your search.
        </motion.p>
      )}
    </div>
  )
}

export default Courses