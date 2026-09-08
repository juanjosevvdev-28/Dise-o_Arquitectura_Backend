# Sistema de Gestión de Eventos API

Este proyecto es el backend modularizado y estructurado por capas para una plataforma de gestión y reserva de eventos académicos o de entretenimiento.

## 🚀 Tecnologías Utilizadas
* **Node.js** (Entorno de ejecución)
* **Express.js** (Framework web)
* **Dotenv** (Gestión de variables de entorno)
* **Módulos ESM** (Uso moderno de import/export)

## 📦 Instalación y Configuración

1. Clonar el repositorio público.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example` y rellenar los datos.

## 🛠️ Cómo Ejecutar el Proyecto

* **Modo Desarrollo (con auto-recarga automática):**
  ```bash
  npm run dev
  ```
* **Modo Producción:**
  ```bash
  npm start
  ```

## 📁 Estructura del Proyecto por Capas
* **config/**: Configuración general y variables de entorno.
* **routes/**: Definición de endpoints de la aplicación.
* **controllers/**: Manejo de las solicitudes HTTP y respuestas al cliente.
* **services/**: Lógica de negocio core del dominio.
* **repositories/**: Abstracción del acceso a datos.
* **dao/**: Data Access Objects para interactuar con la persistencia.
* **models/**: Definición de esquemas de datos (User, Event).
* **middlewares/**: Filtros intermedios (validaciones, auth, control de errores).
* **utils/**: Funciones auxiliares o herramientas compartidas.

## 🛣️ Rutas Disponibles
* `GET /api/health` -> Verifica si el servidor está activo de forma correcta.
* `GET /api/events` -> Retorna la lista de eventos disponibles (actualmente vacía).
* `GET /api/sessions/current` -> Endpoint base para la sesión del usuario.

## 🔐 Pre-entrega 2: Registro seguro de usuarios (POST /api/sessions/register)

El endpoint de registro recibe los datos del usuario, normaliza el email, hashea la contraseña de manera segura usando `bcrypt` y persiste el registro en MongoDB.

### Estructura esperada del JSON (Body):
```json
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "email": "Ana@Mail.com ",
  "password": "Secreta123"
}
```

### Respuestas del Servidor:
* **201 Created**: Registro exitoso. Devuelve el objeto del usuario normalizado y excluye por completo el campo `password`.
* **400 Bad Request**: Faltan campos obligatorios o formato inválido.
* **409 Conflict**: El correo electrónico ya se encuentra registrado en el sistema.
