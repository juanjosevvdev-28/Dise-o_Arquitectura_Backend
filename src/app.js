// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
// 1. Descomenta los enrutadores e importa el archivo correcto de sesiones
// (Asegúrate de poner la ruta de archivo relativa correcta a tu proyecto)
import sessionsRouter from './routes/sessions.router.js';
// import eventsRouter from './routes/events.js'; // Descoméntalo cuando lo uses

const app = express();

// Middlewares esenciales para leer JSON en peticiones POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// 2. Descomenta el enrutador de sesiones para enlazarlo a la API
app.use('/api/sessions', sessionsRouter);
// app.use('/api/events', eventsRouter); // Descoméntalo cuando lo uses

export default app;
