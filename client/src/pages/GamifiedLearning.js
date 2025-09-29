// src/pages/GamifiedLearning.js

"use client"
import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTrophy, FaStar, FaLock, FaPlay, FaCheck, FaTimes, FaRocket } from "react-icons/fa"
import Confetti from "react-confetti"
import api from "../config/api"
import { useAuth } from "../context/AuthContext"
import ChallengeModal from "./ChallengeModal" // ✅ NEW: Import the modal component
import "./GamifiedLearning.css"

const gamifiedModulesData = [
  {
    id: "disaster-awareness",
    title: "Disaster Awareness Basics",
    description: "Understand earthquakes, floods, and fire safety essentials",
    xpReward: 100,
    difficulty: "Beginner",
    duration: "15 min",
    icon: "🌪️",
    challenges: [
      { id: 1, name: "Identify Disaster Types", xp: 25 },
      { id: 2, name: "Safety Protocol Quiz", xp: 25 },
      { id: 3, name: "Emergency Kit Assembly", xp: 25 },
      { id: 4, name: "Risk Assessment", xp: 25 },
    ],
  },
  {
    id: "emergency-preparedness",
    title: "Emergency Preparedness Planning",
    description: "Learn how to prepare and respond effectively in disasters",
    xpReward: 150,
    difficulty: "Intermediate",
    duration: "20 min",
    icon: "📋",
    challenges: [
      { id: 1, name: "Create Emergency Plan", xp: 40 },
      { id: 2, name: "Communication Strategy", xp: 35 },
      { id: 3, name: "Resource Management", xp: 40 },
      { id: 4, name: "Evacuation Routes", xp: 35 },
    ],
  },
  {
    id: "first-aid-skills",
    title: "First Aid & Life-Saving Skills",
    description: "Master basic first aid techniques during emergencies",
    xpReward: 200,
    difficulty: "Advanced",
    duration: "25 min",
    icon: "🏥",
    challenges: [
      { id: 1, name: "CPR Simulation", xp: 50 },
      { id: 2, name: "Wound Care Practice", xp: 50 },
      { id: 3, name: "Emergency Response", xp: 50 },
      { id: 4, name: "Medical Assessment", xp: 50 },
    ],
  },
  {
    id: "fire-safety",
    title: "Fire Safety & Evacuation",
    description: "Learn how to prevent fires and safely evacuate buildings",
    xpReward: 120,
    difficulty: "Beginner",
    duration: "18 min",
    icon: "🔥",
    challenges: [
      { id: 1, name: "Fire Prevention Quiz", xp: 30 },
      { id: 2, name: "Evacuation Drill", xp: 30 },
      { id: 3, name: "Fire Extinguisher Use", xp: 30 },
      { id: 4, name: "Smoke Safety", xp: 30 },
    ],
  },
  {
    id: "flood-preparedness",
    title: "Flood Preparedness",
    description: "Understand flood risks and how to protect yourself and family",
    xpReward: 130,
    difficulty: "Intermediate",
    duration: "22 min",
    icon: "🌊",
    challenges: [
      { id: 1, name: "Flood Risk Assessment", xp: 35 },
      { id: 2, name: "Water Safety Skills", xp: 30 },
      { id: 3, name: "Property Protection", xp: 35 },
      { id: 4, name: "Emergency Supplies", xp: 30 },
    ],
  },
  {
    id: "earthquake-safety",
    title: "Earthquake Safety",
    description: "Learn how to act before, during, and after an earthquake",
    xpReward: 140,
    difficulty: "Intermediate",
    duration: "20 min",
    icon: "🏗️",
    challenges: [
      { id: 1, name: "Drop, Cover, Hold", xp: 35 },
      { id: 2, name: "Building Safety", xp: 35 },
      { id: 3, name: "Aftershock Response", xp: 35 },
      { id: 4, name: "Recovery Planning", xp: 35 },
    ],
  },
]

const badgeDefinitions = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first module",
    icon: "🎯",
    condition: (progress) => progress.completedModules.length >= 1,
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    description: "Complete 3 modules",
    icon: "📚",
    condition: (progress) => progress.completedModules.length >= 3,
  },
  {
    id: "disaster-expert",
    name: "Disaster Expert",
    description: "Complete all modules",
    icon: "🏆",
    condition: (progress) => progress.completedModules.length >= gamifiedModulesData.length,
  },
]

const GamifiedLearning = () => {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [activeTab, setActiveTab] = useState("modules")
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadUserProgress = useCallback(async () => {
    if (!user) return
    try {
      setIsLoading(true)
      const [progressResponse, leaderboardResponse] = await Promise.all([
        api.get("/gamified/progress"),
        api.get("/gamified/leaderboard"),
      ])

      const progressData = progressResponse.data
      const leaderboardData = leaderboardResponse.data

      setLeaderboard(
        [
          ...leaderboardData,
          { rank: 4, name: "You", xp: progressData.xp, level: progressData.level, avatar: "👤" },
        ]
          .sort((a, b) => b.xp - a.xp)
          .map((item, index) => ({ ...item, rank: index + 1 })),
      )
      setUserProgress(progressData)
    } catch (error) {
      console.error("Error loading user progress:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadUserProgress()
  }, [loadUserProgress])

  const completeChallenge = async (moduleId, challengeId) => {
    if (!userProgress) return
    const module = gamifiedModulesData.find((m) => m.id === moduleId)
    const challenge = module.challenges.find((c) => c.id === challengeId)

    // Optimistic UI update
    const updatedProgress = { ...userProgress };
    if (!updatedProgress.moduleProgress[moduleId]) {
      updatedProgress.moduleProgress[moduleId] = { challenges: {} };
    }
    if (!updatedProgress.moduleProgress[moduleId].challenges[challengeId]) {
      updatedProgress.moduleProgress[moduleId].challenges[challengeId] = { completed: true, completedAt: new Date() };
      updatedProgress.xp += challenge.xp;
      updatedProgress.level = Math.floor(updatedProgress.xp / 1000) + 1;
    }
    setUserProgress(updatedProgress);

    try {
      const response = await api.post("/gamified/complete-challenge", {
        moduleId,
        challengeId,
        xp: challenge.xp,
      });

      const finalProgress = response.data;
      setUserProgress(finalProgress);

      const isModuleCompleted = finalProgress.completedModules.includes(moduleId);
      if (isModuleCompleted) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }

      const newBadges = badgeDefinitions.filter(badge =>
        badge.condition(finalProgress) && !finalProgress.badges.some(b => b.badgeId === badge.id)
      );

      if (newBadges.length > 0) {
        await api.post("/gamified/earn-badge", { badges: newBadges });
        const freshProgress = await api.get("/gamified/progress");
        setUserProgress(freshProgress.data);
      }

    } catch (error) {
      console.error("Error completing challenge:", error.response?.data || error.message)
      // Rollback optimistic update on error
      loadUserProgress();
    }
  };

  const badges = badgeDefinitions.map((badge) => ({
    ...badge,
    earned: userProgress?.badges.some((b) => b.badgeId === badge.id),
  }))

  const gamifiedModules = gamifiedModulesData.map((module) => {
    const progress = userProgress?.moduleProgress?.[module.id]
    const completedChallenges = progress?.challenges ? Object.values(progress.challenges).filter(c => c.completed).length : 0
    const progressPercentage = (completedChallenges / module.challenges.length) * 100
    const isCompleted = progressPercentage === 100;
    const isUnlocked = userProgress ? userProgress.level >= (module.difficulty === 'Intermediate' ? 2 : module.difficulty === 'Advanced' ? 3 : 1) : false;

    return {
      ...module,
      unlocked: isUnlocked,
      completed: isCompleted,
      progress: progressPercentage,
      challenges: module.challenges.map(challenge => ({
        ...challenge,
        completed: progress?.challenges?.[challenge.id]?.completed || false
      }))
    }
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-100"
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100"
      case "Advanced":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  if (isLoading || !userProgress) {
    return (
      <div className="gamified-learning-container">
        <div className="loading-container">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="loading-text">Loading your progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="gamified-learning-container">
      {showConfetti && <Confetti />}

      {/* Header with User Stats */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="gamified-header">
        <h1 className="gamified-title">🎮 Gamified Learning</h1>
        <p className="gamified-subtitle">Master disaster preparedness through interactive challenges</p>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value">{userProgress.level}</div>
            <div className="stat-label">Level</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userProgress.xp}</div>
            <div className="stat-label">XP</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userProgress.streak}</div>
            <div className="stat-label">Streak</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="xp-progress-container">
          <div className="xp-progress-info">
            <span>Progress to Level {userProgress.level + 1}</span>
            <span>
              {userProgress.xp}/{userProgress.totalXP} XP
            </span>
          </div>
          <div className="xp-progress-bar">
            <motion.div
              className="xp-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(userProgress.xp / userProgress.totalXP) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {[
          { key: "modules", label: "🎯 Modules" },
          { key: "badges", label: "🏆 Badges" },
          { key: "leaderboard", label: "👑 Leaderboard" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "modules" && (
          <motion.div
            key="modules"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="section-header">
              <h2 className="section-title">🎯 Learning Modules</h2>
              <p className="section-subtitle">
                Complete interactive challenges to master disaster preparedness skills and earn XP rewards
              </p>
            </div>

            <div className="modules-grid">
              {gamifiedModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`module-card ${!module.unlocked ? "locked" : ""} ${module.completed ? "completed" : ""}`}
                >
                  <div className="module-content">
                    <div className="module-header">
                      <div className="module-icon-container">
                        <div className="module-icon">{module.icon}</div>
                      </div>
                      {!module.unlocked && <FaLock className="module-lock" />}
                      {module.completed && <FaCheck className="module-status" />}
                    </div>

                    <h3 className="module-title">{module.title}</h3>
                    <p className="module-description">{module.description}</p>

                    <div className="module-meta">
                      <span className={`difficulty-badge difficulty-${module.difficulty.toLowerCase()}`}>
                        {module.difficulty}
                      </span>
                      <span className="module-duration">{module.duration}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="module-progress">
                      <div className="progress-info">
                        <span>Progress</span>
                        <span>{Math.round(module.progress)}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>

                    <div className="module-footer">
                      <div className="xp-reward">
                        <FaTrophy />
                        <span>{module.xpReward} XP</span>
                      </div>

                      <button
                        onClick={() => setSelectedModule(module)}
                        disabled={!module.unlocked}
                        className={`module-button ${module.unlocked ? "primary" : "disabled"}`}
                      >
                        {module.completed ? "Review" : "Start"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "badges" && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="section-header">
              <h2 className="section-title">🏆 Achievement Badges</h2>
              <p className="section-subtitle">
                Unlock special badges by completing milestones and demonstrating mastery
              </p>
            </div>

            <div className="badges-grid">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`badge-card ${badge.earned ? "earned" : ""}`}
                >
                  <div className="badge-icon">{badge.icon}</div>
                  <h3 className="badge-name">{badge.name}</h3>
                  <p className="badge-description">{badge.description}</p>
                  {badge.earned && <div className="badge-earned">Earned!</div>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "leaderboard" && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="section-header">
              <h2 className="section-title">👑 Leaderboard</h2>
              <p className="section-subtitle">
                See how you rank against other learners in the disaster preparedness community
              </p>
            </div>

            <div className="leaderboard-container">
              <div className="leaderboard-header">
                <h2 className="leaderboard-title">
                  <FaTrophy />
                  Top Learners
                </h2>
              </div>
              <div>
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`leaderboard-item ${user.name === "You" ? "current-user" : ""}`}
                  >
                    <div className="leaderboard-left">
                      <div
                        className={`rank-badge ${
                          user.rank === 1
                            ? "rank-1"
                            : user.rank === 2
                              ? "rank-2"
                              : user.rank === 3
                                ? "rank-3"
                                : "rank-other"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <div className="user-avatar">{user.avatar}</div>
                      <div className="user-info">
                        <h4>{user.name}</h4>
                        <p>Level {user.level}</p>
                      </div>
                    </div>
                    <div className="user-xp">
                      <div className="xp-value">{user.xp} XP</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-section">
                  <div className="text-4xl">{selectedModule.icon}</div>
                  <div>
                    <h2 className="modal-title">{selectedModule.title}</h2>
                    <p className="modal-subtitle">{selectedModule.description}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedModule(null)} className="modal-close">
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <h3 className="challenges-title">🎯 Module Challenges</h3>
                <div className="challenges-list">
                  {selectedModule.challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`challenge-item ${challenge.completed ? "completed" : ""}`}
                    >
                      <div className="challenge-content">
                        <div className="challenge-left">
                          <div className="challenge-icon">{challenge.completed ? <FaCheck /> : <FaPlay />}</div>
                          <div>
                            <h4 className="challenge-name">{challenge.name}</h4>
                            <div className="challenge-xp">
                              <FaStar />
                              <span>{challenge.xp} XP</span>
                            </div>
                          </div>
                        </div>

                        {!challenge.completed && (
                          <button
                            onClick={() => completeChallenge(selectedModule.id, challenge.id)}
                            className="challenge-button"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GamifiedLearning