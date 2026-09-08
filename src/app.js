import express from 'express';
import dotenv from 'dotenv';
import eventsRouter from './routes/events.router.js';
import sessionsRouter from './routes/sessions.router.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares globales requeridos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de prueba: Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Servidor activo"
    });
});

// Enlazar los enrutadores de los recursos
app.use('/api/events', eventsRouter);
app.use('/api/sessions', sessionsRouter);

export default app;
