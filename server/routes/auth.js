import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/status
router.get('/status', (req, res) => {
  res.status(200).json({ status: 'Ready', message: 'Auth service is running' });
});

export default router;
