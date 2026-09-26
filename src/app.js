import express from 'express';
import cookieParser from 'cookie-parser';
import sessionsRouter from './routes/sessions.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor activo' });
});

app.use('/api/sessions', sessionsRouter);

export default app;
