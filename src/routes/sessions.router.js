import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

// POST /api/sessions/register
router.post('/register', (req, res) => SessionsController.register(req, res));

// POST /api/sessions/login
router.post('/login', (req, res) => SessionsController.login(req, res));

// GET /api/sessions/current (protegida)
router.get('/current', auth, (req, res) => SessionsController.current(req, res));

// POST /api/sessions/logout
router.post('/logout', (req, res) => SessionsController.logout(req, res));

export default router;
