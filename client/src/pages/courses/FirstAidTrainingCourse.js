import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./Course.module.css"

export const firstAidModules = [
  {
    id: "fa1",
    title: "Introduction to First Aid",
    description: "Understanding the basics of first aid and its importance",
    videoUrl: "",
  },
  {
    id: "fa2",
    title: "CPR and Resuscitation",
    description: "Step-by-step guide to performing CPR effectively",
    videoUrl: "",
  },
  {
    id: "fa3",
    title: "Handling Bleeding and Fractures",
    description: "How to treat cuts, bleeding, sprains, and broken bones",
    videoUrl: "",
  },
  {
    id: "fa4",
    title: "Emergency Medical Support",
    description: "Stabilizing patients until professional help arrives",
    videoUrl: "",
  },
]

const FirstAidTrainingCourse = () => {
  const navigate = useNavigate()

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/first-aid-training/video/${videoId}`)
  }

  return (
    <div className={styles.courseDetail}>
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        First Aid Training
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        Gain essential skills to provide immediate help in medical emergencies.
      </motion.p>

      <motion.div className={styles.courseInfo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <p><strong>Duration:</strong> 10 hours</p>
        <p><strong>Difficulty:</strong> Beginner</p>
        <p><strong>Category:</strong> Health & Safety</p>
      </motion.div>

      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        Course Modules
      </motion.h2>

      <motion.div className={styles.moduleList} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {firstAidModules.map((module, index) => (
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

export default FirstAidTrainingCourse