import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./Course.module.css"

export const disasterAwarenessModules = [
  {
    id: "disaster1",
    title: "Introduction to Disaster Awareness",
    description: "Understanding different types of disasters and their impact on communities",
    videoUrl: "https://www.dropbox.com/scl/fi/aq925p8ec9jpszx5ty7d6/Introduction-To-Python-1-_-Python-For-Beginners-_-Python-Tutorial-_-Python-Basics-_-Simplilearn.mp4?rlkey=r8m20e9tphbpwfk8xjvivubj6&st=b0zmdfpw&dl=1",
  },
  {
    id: "disaster2",
    title: "Preparedness and Safety Measures",
    description: "Learn essential steps to prepare before disasters strike",
    videoUrl: "",
  },
  {
    id: "disaster3",
    title: "Emergency Response and First Aid",
    description: "Immediate actions and first aid techniques during disasters",
    videoUrl: "",
  },
  {
    id: "disaster4",
    title: "Recovery and Community Support",
    description: "Post-disaster recovery strategies and building resilient communities",
    videoUrl: "",
  },
]

const DisasterAwarenessCourse = () => {
  const navigate = useNavigate()

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/disaster-awareness/video/${videoId}`)
  }

  return (
    <div className={styles.courseDetail}>
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Disaster Awareness and Preparedness
      </motion.h1>
      <motion.div
        className={styles.courseImageContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Learn how to stay safe and protect your community by understanding disasters and effective preparedness measures.
      </motion.p>

      <motion.div
        className={styles.courseInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          <strong>Duration:</strong> 15 hours
        </p>
        <p>
          <strong>Difficulty:</strong> Beginner – Intermediate
        </p>
        <p>
          <strong>Category:</strong> Safety & Awareness
        </p>
      </motion.div>

      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
        Course Modules
      </motion.h2>
      <motion.div
        className={styles.moduleList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {disasterAwarenessModules.map((module, index) => (
          <motion.div
            key={module.id}
            className={styles.moduleItem}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => handleWatchVideo(module.id)}>
              Watch Video
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className={styles.courseActions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Link to="/courses" className={`${styles.btn} ${styles.btnTertiary}`}>
          Back to Courses
        </Link>
      </motion.div>
    </div>
  )
}

export default DisasterAwarenessCourse