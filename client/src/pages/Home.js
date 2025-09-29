"use client"
import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaGamepad, FaTrophy, FaRocket, FaHandsHelping, 
  FaLightbulb, FaShieldAlt, FaPhone, FaExclamationTriangle, 
  FaTint, FaFireAlt, FaFirstAid 
} from "react-icons/fa"
import "./Home.css"

const Home = () => {
  const featuredCourses = [
    {
      id: "disaster-awareness",
      title: "Disaster Awareness Basics",
      description: "Understand earthquakes, floods, and fire safety essentials",
      image: "/awareness.jpg",
      xp: 100,
      difficulty: "Beginner",
    },
    {
      id: "emergency-preparedness",
      title: "Emergency Preparedness Planning",
      description: "Learn how to prepare and respond effectively in disasters",
      image: "/emergency-preparedness.jpg",
      xp: 150,
      difficulty: "Intermediate",
    },
    {
      id: "first-aid-training",
      title: "First Aid & Life-Saving Skills",
      description: "Master basic first aid techniques during emergencies",
      image: "/firstaid.jpeg",
      xp: 200,
      difficulty: "Advanced",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
  }

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  const factVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({ x: 0, opacity: 1, transition: { delay: i * 0.2, duration: 0.5 } }),
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <motion.div className="hero-content" variants={heroVariants} initial="hidden" animate="visible">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaGamepad className="hero-badge-icon" />
            <span>Gamified Learning Platform</span>
          </motion.div>
          <h1>Welcome to Disaster Response Education Platform</h1>
          <p>
            Empowering schools and colleges with interactive disaster management
            learning. Prepare, act, and stay safe through gamified experiences.
          </p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/courses" className="btn btn-primary">
                <FaRocket className="btn-icon" />
                Explore Courses
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/gamified-learning" className="btn btn-secondary">
                <FaGamepad className="btn-icon" />
                Start Gaming
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100, -200],
                x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
            />
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses">
        <motion.div className="section-header" variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2>Featured Training Modules</h2>
          <p>Master disaster preparedness through interactive learning experiences</p>
        </motion.div>
        <motion.div className="course-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {featuredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="course-card featured-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03, rotateY: 5, transition: { type: "spring", stiffness: 300 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={`/courses/${course.id}`} className="card-link">
                <div className="course-image-wrapper">
                  <img src={course.image} alt={course.title} />
                  <div className="course-overlay">
                    <div className="course-xp">
                      <FaTrophy className="xp-icon" />
                      {course.xp} XP
                    </div>
                    <div className={`difficulty-badge ${course.difficulty.toLowerCase()}`}>{course.difficulty}</div>
                  </div>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
                <div className="course-action">
                  <div className="btn btn-course">
                    Start Learning
                    <FaRocket className="btn-icon" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why It Matters Section */}
      <section className="why-it-matters">
        <motion.div className="section-header" variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h6 className="section-subtitle">OUR MISSION</h6>
          <h2>Why Disaster Preparedness Matters</h2>
          <p>Being prepared isn't just an option—it's a critical skill for life. Our platform makes it accessible and engaging.</p>
        </motion.div>
        <div className="why-it-matters-grid">
          {[
            {
              icon: FaLightbulb,
              title: "Build Critical Knowledge",
              description: "Our courses cover essential skills like fire safety, first aid, and evacuation planning. Knowledge is your first line of defense.",
              color: "#ff6b35",
            },
            {
              icon: FaShieldAlt,
              title: "Foster Resilience",
              description: "Through virtual drills and scenarios, students learn to stay calm and act decisively under pressure.",
              color: "#667eea",
            },
            {
              icon: FaHandsHelping,
              title: "Empower Communities",
              description: "By preparing individuals, we strengthen entire school communities, creating a network of safety and support.",
              color: "#10b981",
            },
          ].map((fact, index) => (
            <motion.div key={index} className="fact-card" custom={index} variants={factVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <fact.icon className="fact-icon" style={{ color: fact.color }} />
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="platform-features">
        <motion.div className="section-header" variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2>Why Choose Our Platform?</h2>
          <p>Experience the future of disaster preparedness education</p>
        </motion.div>
        <motion.div className="features-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { icon: "📚", title: "Localized Disaster Content", description: "Courses tailored to region-specific disasters in India", color: "#4f46e5" },
            { icon: "🎮", title: "Gamified Learning", description: "Virtual drills & interactive modules for better engagement", color: "#059669" },
            { icon: "📊", title: "Preparedness Tracking", description: "Monitor student and staff participation in drills", color: "#dc2626" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              style={{ "--feature-color": feature.color }}
            >
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-glow"></div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

     {/* Emergency Toolkit Section */}
<section className="emergency-toolkit">
  <motion.div
    className="section-header"
    variants={sectionHeaderVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <h2>🛑 Emergency Toolkit</h2>
    <p>Quick access to verified emergency numbers, disaster guidance, and preparedness tips</p>
  </motion.div>

  <div className="toolkit-grid">
    {/* SOS Section */}
    <motion.div className="toolkit-card sos" variants={itemVariants} whileHover={{ scale: 1.05 }}>
      <FaExclamationTriangle className="toolkit-icon" style={{ color: "#dc2626" }} />
      <h3>SOS</h3>
      <p>If you are in immediate danger, dial the national emergency number:</p>
      <a href="tel:112" className="btn btn-sos">📞 Call 112 (All-in-One Emergency)</a>
      <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
        112 connects you to police, fire, ambulance, and disaster management.
      </p>
    </motion.div>

    {/* Emergency Contacts */}
    <motion.div className="toolkit-card contacts" variants={itemVariants} whileHover={{ scale: 1.05 }}>
      <FaPhone className="toolkit-icon" style={{ color: "#2563eb" }} />
      <h3>Emergency Numbers (India)</h3>
      <ul>
        <li><strong>🔥 Fire Services:</strong> <a href="tel:101">101</a></li>
        <li><strong>🚑 Ambulance:</strong> <a href="tel:102">102</a> / <a href="tel:108">108</a></li>
        <li><strong>🚓 Police:</strong> <a href="tel:100">100</a></li>
        <li><strong>👩‍⚕️ Women’s Helpline:</strong> <a href="tel:1091">1091</a></li>
        <li><strong>👦 Child Helpline:</strong> <a href="tel:1098">1098</a></li>
      </ul>
      <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
        Save these in your phone under "ICE" (In Case of Emergency).
      </p>
    </motion.div>

    {/* Guidance */}
    <motion.div className="toolkit-card guidance" variants={itemVariants} whileHover={{ scale: 1.05 }}>
      <FaFirstAid className="toolkit-icon" style={{ color: "#059669" }} />
      <h3>Step-by-Step Disaster Guidance</h3>
      <ul>
        <li>
          <FaExclamationTriangle size={14} /> <strong>Earthquake:</strong> 
          Drop, Cover, Hold On. Stay indoors, move away from windows. If outside, move to open space.
        </li>
        <li>
          <FaTint size={14} /> <strong>Flood:</strong> 
          Move to higher ground, avoid walking/driving through flood waters, unplug electricals.
        </li>
        <li>
          <FaFireAlt size={14} /> <strong>Fire:</strong> 
          Evacuate using stairs, never elevators. Stay low to avoid smoke, cover mouth with cloth.
        </li>
        <li>
          <FaFirstAid size={14} /> <strong>Medical:</strong> 
          Apply first aid if trained, call for ambulance, keep patient calm until help arrives.
        </li>
      </ul>
    </motion.div>

    {/* Preparedness Tips */}
    <motion.div className="toolkit-card tips" variants={itemVariants} whileHover={{ scale: 1.05 }}>
      <FaLightbulb className="toolkit-icon" style={{ color: "#f59e0b" }} />
      <h3>Preparedness Tips</h3>
      <ul>
        <li>📦 Keep a <strong>72-hour emergency kit</strong>: water, dry food, first-aid, flashlight, batteries, and power bank.</li>
        <li>🗺️ Know your <strong>nearest evacuation routes and shelters</strong>.</li>
        <li>📱 Install apps like <strong>NDMA</strong> or <strong>MyNDMA</strong> for disaster alerts.</li>
        <li>👨‍👩‍👧‍👦 Conduct family/school <strong>mock drills</strong> regularly.</li>
        <li>🔋 Keep documents, IDs, and emergency cash in a waterproof pouch.</li>
      </ul>
    </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home