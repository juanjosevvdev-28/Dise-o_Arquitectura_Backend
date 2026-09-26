import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log('🚀 Servidor corriendo');
  console.log(`Puerto: ${PORT}`);
  console.log(`Modo: ${NODE_ENV}`);
  console.log(`Prueba: http://localhost:${PORT}/api/health`);
});
