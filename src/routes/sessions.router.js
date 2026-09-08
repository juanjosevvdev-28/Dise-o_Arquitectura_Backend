import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

// POST /api/sessions/register
router.post('/register', SessionsController.register);

export default router;
