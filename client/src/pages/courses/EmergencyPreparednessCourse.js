import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./Course.module.css"

export const emergencyModules = [
  {
    id: "em1",
    title: "Emergency Planning Basics",
    description: "Developing personal and institutional emergency plans",
    videoUrl: "",
  },
  {
    id: "em2",
    title: "Evacuation Procedures",
    description: "How to evacuate buildings quickly and safely",
    videoUrl: "",
  },
  {
    id: "em3",
    title: "Communication During Emergencies",
    description: "Emergency contacts and communication tools",
    videoUrl: "",
  },
  {
    id: "em4",
    title: "Preparedness Drills",
    description: "Conducting and participating in mock emergency drills",
    videoUrl: "",
  },
]

const EmergencyPreparednessCourse = () => {
  const navigate = useNavigate()

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/emergency-preparedness/video/${videoId}`)
  }

  return (
    <div className={styles.courseDetail}>
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Emergency Preparedness
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        Build resilience by preparing for emergencies before they happen.
      </motion.p>

      <motion.div className={styles.courseInfo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <p><strong>Duration:</strong> 12 hours</p>
        <p><strong>Difficulty:</strong> Intermediate</p>
        <p><strong>Category:</strong> Emergency Response</p>
      </motion.div>

      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        Course Modules
      </motion.h2>

      <motion.div className={styles.moduleList} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {emergencyModules.map((module, index) => (
          <motion.div
            key={module.id}
            className={styles.moduleItem}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
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

      <motion.div className={styles.courseActions} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <Link to="/courses" className={`${styles.btn} ${styles.btnTertiary}`}>Back to Courses</Link>
      </motion.div>
    </div>
  )
}

export default EmergencyPreparednessCourse