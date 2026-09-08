import { Router } from 'express';

const router = Router();

// GET /api/sessions/current (Estructura inicial vacía sin lógica de auth)
router.get('/current', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Estructura inicial de sesiones lista"
    });
});

export default router;
