import app from './app.js';

// Usar el puerto de la variable de entorno, o el 8080 por defecto si no existe
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'production';

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT} en modo [${NODE_ENV}]`);
});
