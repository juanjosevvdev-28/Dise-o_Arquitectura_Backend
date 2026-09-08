import { Router } from 'express';

const router = Router();

// GET /api/events
router.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        payload: []
    });
});

export default router;
