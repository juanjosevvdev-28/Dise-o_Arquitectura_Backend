import { Router } from 'express';

const router = Router();

// GET /api/sessions/current (Estructura inicial vacía sin lógica de auth)
router.get('/current', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Estructura inicial de sesiones lista"
    });
});


import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

// POST /api/sessions/register
router.post('/register', SessionsController.register);


export default router;
