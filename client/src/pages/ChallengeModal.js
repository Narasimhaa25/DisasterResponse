// src/pages/ChallengeModal.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCheck, FaStar, FaTimes } from 'react-icons/fa';
import './ChallengeModal.css';

const ChallengeModal = ({ selectedModule, onClose, onCompleteChallenge, quizData }) => {
  const [quizState, setQuizState] = useState('challenges'); // 'challenges', 'quiz', 'results'
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const handleStartQuiz = () => {
    setQuizState('quiz');
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizData.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = (score / quizData.length) * 100;
    const passed = percentage >= 75;
    
    setQuizResult({ score, total: quizData.length, percentage, passed });
    setQuizState('results');

    if (passed) {
      // The challenge is considered completed only if the quiz is passed
      onCompleteChallenge(selectedModule.id, selectedModule.challenges[0].id); // Assuming one quiz per module
    }
  };

  const renderContent = () => {
    switch (quizState) {
      case 'challenges':
        return (
          <>
            <h3 className="challenges-title">🎯 Module Challenges</h3>
            <div className="challenges-list">
              {selectedModule.challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: challenge.id * 0.1 }}
                  className={`challenge-item ${challenge.completed ? 'completed' : ''}`}
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
                      <button onClick={handleStartQuiz} className="challenge-button">
                        Start Quiz
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        );

      case 'quiz':
        return (
          <div className="quiz-container">
            <h3 className="challenges-title">📝 Take the Quiz</h3>
            <div className="quiz-questions">
              {quizData.map((q) => (
                <div key={q.id} className="quiz-question-item">
                  <p className="quiz-question-text">{q.question}</p>
                  <div className="quiz-options">
                    {q.options.map((option, index) => (
                      <label key={index} className="quiz-option">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={option}
                          checked={userAnswers[q.id] === option}
                          onChange={() => handleAnswerChange(q.id, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleSubmitQuiz} className="challenge-button primary">
              Submit Quiz
            </button>
          </div>
        );

      case 'results':
        return (
          <div className="quiz-results">
            <h3 className="challenges-title">✅ Quiz Results</h3>
            <p className="results-text">You scored {quizResult.score} out of {quizResult.total}!</p>
            <p className="results-text">Your score: {quizResult.percentage}%</p>
            {quizResult.passed ? (
              <p className="passed">✅ You passed! The module is now complete.</p>
            ) : (
              <p className="failed">❌ You did not pass. Please try again!</p>
            )}
            <button onClick={onClose} className="challenge-button">
              Close
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
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
            <h2 className="modal-title">{selectedModule.title}</h2>
            <p className="modal-subtitle">{selectedModule.description}</p>
          </div>
          <button onClick={onClose} className="modal-close">
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeModal;