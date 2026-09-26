// server.js
import app from './app.js';
import dotenv from 'dotenv';
import mo
dotenv.config();

const P.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'production';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/eventos';

async function startServer() {
    try {
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 5000
        });

        console.log('🍃 Conexión exitosa a MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT} en modo [${NODE_ENV}]`);
            console.log(`Prueba tu API en: http://localhost:${PORT}/api/sessions/register`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor o conectar a la BD:', error);
        process.exit(1);
    }
}

startServer();
