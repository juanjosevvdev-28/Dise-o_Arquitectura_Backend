import express from 'express';
import cookieParser from 'cookie-parser';
import sessionsRouter from './routes/sessions.router.js';

const app = express();

// Middlewares esenciales para leer JSON en peticiones POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor activo' });
});

// Rutas de autenticación
app.use('/api/sessions', sessionsRouter);

export default app;
