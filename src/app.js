import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventsRouter from './routes/events.router.js';
import sessionsRouter from './routes/sessions.router.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares globales requeridos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB (Usando la variable de entorno de tu clúster)
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('🍃 Conectado exitosamente a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Endpoint de prueba: Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok", message: "Servidor activo" });
});

// Enlazar los enrutadores de los recursos
app.use('/api/events', eventsRouter);
app.use('/api/sessions', sessionsRouter);

export default app;
