// import express from 'express';
// import passport from 'passport';
// import jwt from 'jsonwebtoken';
// import { signup, signin } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/signup', signup);
// router.post('/signin', signin);

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback',
//   passport.authenticate('google', { session: false }),
//   (req, res) => {
//     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
//     res.redirect(`http://localhost:5173?token=${token}`);
//   }
// );

// export default router;




import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { signup, signin, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.get('/profile/:username', getUserProfile);


router.post('/signup', signup);
router.post('/signin', signin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

export default router;