import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', (req, res) => SessionsController.register(req, res));
router.post('/login', (req, res) => SessionsController.login(req, res));
router.get('/current', auth, (req, res) => SessionsController.current(req, res));
router.post('/logout', (req, res) => SessionsController.logout(req, res));

export default router;
