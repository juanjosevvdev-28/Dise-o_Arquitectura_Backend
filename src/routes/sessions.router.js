import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

// POST /api/sessions/register
router.post('/register', SessionsController.register);
router.post('/login', SessionsController.login);
router.get('/current', auth, SessionsController.current);
router.post('/logout', SessionsController.logout);

export default router;
