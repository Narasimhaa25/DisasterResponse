import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { quizData } from '../data/QuizData';
import './Quiz.css';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showCelebration, setShowCelebration] = useState(false); // 🎉 new

  useEffect(() => {
    if (quizData[quizId]) {
      setQuestions(quizData[quizId]);
    } else {
      navigate('/quizzes');
    }
  }, [quizId, navigate]);

  const handleAnswer = (index) => {
    if (!questions[currentIndex]) return;

    const correct = index === questions[currentIndex].correctAnswer;
    setSelectedIndex(index);
    setAnsweredCount(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
      setFeedback("✅ Correct!");
      setShowCelebration(true); // 🎉 trigger animation
      setTimeout(() => setShowCelebration(false), 2500); // hide after 2.5s
    } else {
      const correctText = questions[currentIndex].options[questions[currentIndex].correctAnswer];
      setFeedback(`❌ Wrong! Correct answer: ${correctText}`);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedIndex(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(questions.length);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setShowFeedback(false);
    setSelectedIndex(null);
  };

  if (questions.length === 0) return <p>Loading quiz...</p>;

  const quizOver = currentIndex >= questions.length;
  const currentQ = questions[currentIndex];

  return (
    <div className="quiz-container">
      {/* 🎉 Celebration Layer */}
      {showCelebration && (
        <div className="celebration">
          <span>🎉</span>
          <span>✨</span>
          <span>🥳</span>
          <span>✅</span>
          <span>🌟</span>
        </div>
      )}

      {quizOver ? (
        <motion.div
          className="quiz-complete"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>🎉 Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <p>Attempts: {answeredCount}</p>
          <button className="btn" onClick={resetQuiz}>Retry</button>
          <button className="btn" onClick={() => navigate('/quizzes')}>Back to Quizzes</button>
        </motion.div>
      ) : (
        <>
          <h2>{currentQ.question}</h2>
          <p>Question {currentIndex + 1} of {questions.length}</p>
          <div className="options-list">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                className={`btn option-btn ${
                  showFeedback && idx === currentQ.correctAnswer ? "correct" :
                  showFeedback && idx === selectedIndex ? "wrong" : ""
                }`}
                onClick={() => handleAnswer(idx)}
                disabled={showFeedback}
              >
                {opt}
              </button>
            ))}
          </div>
          {showFeedback && <p className="feedback">{feedback}</p>}
        </>
      )}
    </div>
  );
};

export default Quiz;