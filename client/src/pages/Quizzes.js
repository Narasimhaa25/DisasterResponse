import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Quizzes.css';

const quizzes = [
  { 
    id: 'emergency-preparedness', 
    title: 'Emergency Preparedness Planning',
    description: 'Learn how to prepare and respond effectively in disasters',
    action: 'Start Quiz'
  },
  { 
    id: 'disaster-awareness', 
    title: 'Disaster Awareness Basics',
    description: 'Understand earthquakes, floods, and fire safety essentials',
    action: 'Start Quiz'
  },
  { 
    id: 'first-aid-training', 
    title: 'First Aid & Life-Saving Skills',
    description: 'Master basic first aid techniques during emergencies',
    action: 'Start Quiz'
  },
  { 
    id: 'cybersecurity', 
    title: 'Cybersecurity Basics',
    description: 'Protect your devices and data from cyber threats',
    action: 'Start Quiz'
  },
  { 
    id: 'fire-safety', 
    title: 'Fire Safety & Evacuation',
    description: 'Learn how to prevent fires and safely evacuate buildings',
    action: 'Start Quiz'
  },
  { 
    id: 'earthquake-safety', 
    title: 'Earthquake Safety',
    description: 'Learn how to act before, during, and after an earthquake',
    action: 'Start Quiz'
  }
];

const Quizzes = () => {
  return (
    <div className="modules-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📝 Explore Quizzes
      </motion.h1>
      <motion.div 
        className="module-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            className="module-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <Link to={`/quizzes/${quiz.id}`} className="btn btn-primary">
              {quiz.action}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Quizzes;