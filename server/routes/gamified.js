import express from 'express';
import User from '../models/User.js';
// import authMiddleware from './auth.js'; // You will re-enable this later

const router = express.Router();

// ✅ TEMPORARY AUTH MIDDLEWARE
// Use this to test your routes. Replace this with your actual auth middleware later.
const authMiddleware = (req, res, next) => {
    // You can hardcode a user ID for testing purposes
    req.user = { id: '679b11d8982218c8508981f5' }; 
    next();
};

// ✅ GET /api/gamified/progress - Get user's gamified progress
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('xp level streak badges moduleProgress completedModules');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userProgress = {
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 0,
      badges: user.badges || [],
      moduleProgress: user.moduleProgress || {},
      completedModules: user.completedModules || [],
    };
    
    const totalXP = userProgress.level * 1000 + 1000;
    res.json({ ...userProgress, totalXP });
  } catch (err) {
    console.error('Error in /gamified/progress route:', err.message);
    res.status(500).send('Server Error');
  }
});

// ✅ GET /api/gamified/leaderboard - Get top users
router.get('/leaderboard', authMiddleware, async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ xp: -1 })
      .limit(10)
      .select('name xp level')
      .exec();

    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ✅ POST /api/gamified/complete-challenge - Update progress
router.post('/complete-challenge', authMiddleware, async (req, res) => {
  const { moduleId, challengeId, xp } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.moduleProgress[moduleId]?.challenges?.[challengeId]?.completed) {
        return res.status(400).json({ msg: "Challenge already completed" });
    }

    user.xp += xp;
    user.level = Math.floor(user.xp / 1000) + 1;
    
    if (!user.moduleProgress[moduleId]) {
        user.moduleProgress[moduleId] = { challenges: {} };
    }
    user.moduleProgress[moduleId].challenges[challengeId] = { completed: true, completedAt: new Date() };

    const moduleChallenges = Object.keys(user.moduleProgress[moduleId].challenges);
    if (moduleChallenges.length === 4) {
      if (!user.completedModules.includes(moduleId)) {
        user.completedModules.push(moduleId);
      }
    }

    await user.save();
    
    const updatedUser = await User.findById(user._id).select('xp level streak badges moduleProgress completedModules');
    const totalXP = updatedUser.level * 1000 + 1000;
    res.json({ ...updatedUser._doc, totalXP });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ✅ POST /api/gamified/earn-badge - Award a badge
router.post('/earn-badge', authMiddleware, async (req, res) => {
  const { badges } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newBadgesToAdd = badges.filter(badge => 
        !user.badges.some(existing => existing.badgeId === badge.badgeId)
    );

    if (newBadgesToAdd.length === 0) {
        return res.status(400).json({ msg: 'No new badges to earn' });
    }

    user.badges.push(...newBadgesToAdd);
    await user.save();
    
    res.json(newBadgesToAdd);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;