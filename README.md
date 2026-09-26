# Diseño Arquitectura Backend - Autenticación con JWT y Cookies

Backend desarrollado con Node.js, Express, MongoDB y Mongoose que implementa autenticación segura de usuarios mediante JWT y cookies HTTP Only.

## Características

✅ Registro de usuarios con validación de campos  
✅ Hashing seguro de contraseñas con bcrypt  
✅ Login con generación de JWT  
✅ Almacenamiento de token en cookie HTTP Only  
✅ Ruta protegida /api/sessions/current  
✅ Middleware de autenticación  
✅ Logout con eliminación de cookie  
✅ Variables de entorno configurables  

## Estructura del Proyecto

```
proyecto-eventos/
├── src/
│   ├── app.js                     # Configuración de Express
│   ├── server.js                  # Punto de entrada
│   ├── config/
│   │   └── db.js                  # Conexión a MongoDB
│   ├── models/
│   │   └── User.js                # Modelo de usuario
│   ├── routes/
│   │   └── sessions.router.js     # Rutas de autenticación
│   ├── controllers/
│   │   └── sessions.controller.js # Lógica de autenticación
│   ├── middlewares/
│   │   └── auth.middleware.js     # Middleware de autenticación
│   └── utils/
│       ├── jwt.js                 # Funciones JWT
│       └── hash.js                # Funciones bcrypt
├── .env.example                   # Variables de entorno (ejemplo)
├── .gitignore                     # Archivos ignorados
├── package.json
└── README.md
```

## Requisitos

- Node.js v18 o superior
- MongoDB Atlas (o MongoDB local)
- npm o yarn

## Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/juanjosevvdev-28/Dise-o_Arquitectura_Backend.git
cd Dise-o_Arquitectura_Backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```
PORT=8080
MONGO_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/proyecto-eventos
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

4. **Ejecutar el servidor**

**Modo desarrollo (con hot reload):**

```bash
npm run dev
```

**Modo producción:**

```bash
npm start
```

El servidor estará disponible en `http://localhost:8080`

## Rutas de la API

### 1. Registro de Usuario

**POST** `/api/sessions/register`

Registra un nuevo usuario en la aplicación.

**Request:**

```json
{
  "first_name": "Ana",
  "last_name": "García",
  "email": "ana@mail.com",
  "password": "Secreta123"
}
```

**Response 201:**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "payload": {
    "_id": "665f2a1234567890abcdef12",
    "first_name": "Ana",
    "last_name": "García",
    "email": "ana@mail.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response 400 (Email duplicado):**

```json
{
  "status": "error",
  "message": "Email already registered"
}
```

**Response 400 (Campos faltantes):**

```json
{
  "status": "error",
  "message": "All fields are required"
}
```

---

### 2. Login de Usuario

**POST** `/api/sessions/login`

Autentica un usuario y genera un JWT guardado en una cookie HTTP Only.

**Request:**

```json
{
  "email": "ana@mail.com",
  "password": "Secreta123"
}
```

**Response 200 (Login correcto):**

```json
{
  "status": "success",
  "message": "Login correcto"
}
```

**Response Headers:**

```
Set-Cookie: currentUser=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Lax; Max-Age=3600000; Path=/
```

**Response 401 (Credenciales inválidas):**

```json
{
  "status": "error",
  "message": "Credenciales inválidas"
}
```

---

### 3. Obtener Usuario Autenticado

**GET** `/api/sessions/current`

Obtiene la información del usuario autenticado (requiere cookie con JWT válido).

**Request Headers:**

```
Cookie: currentUser=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response 200 (Autenticado):**

```json
{
  "status": "success",
  "payload": {
    "id": "665f2a1234567890abcdef12",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

**Response 401 (Sin cookie o token inválido):**

```json
{
  "status": "error",
  "message": "No autenticado"
}
```

---

### 4. Logout de Usuario

**POST** `/api/sessions/logout`

Cierra la sesión eliminando la cookie de autenticación.

**Request Headers:**

```
Cookie: currentUser=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response 200:**

```json
{
  "status": "success",
  "message": "Sesión cerrada"
}
```

**Response Headers:**

```
Set-Cookie: currentUser=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/
```

---

## Modelo de Usuario

```javascript
{
  first_name: String,        // Requerido, sin espacios al inicio/final
  last_name: String,         // Requerido, sin espacios al inicio/final
  email: String,             // Requerido, único, minúsculas
  password: String,          // Requerido, hasheado con bcrypt, no se devuelve
  role: String,              // 'user' o 'admin', por defecto 'user'
  createdAt: DateTime,       // Automático
  updatedAt: DateTime        // Automático
}
```

## Payload del JWT

```javascript
{
  id: String,        // ID del usuario en MongoDB
  email: String,     // Email del usuario
  role: String,      // Rol del usuario
  iat: Number,       // Timestamp de emisión
  exp: Number        // Timestamp de expiración
}
```

## Configuración de Cookies

- **httpOnly**: `true` - No accesible desde JavaScript
- **sameSite**: `'lax'` - Protección CSRF
- **maxAge**: `3600000` - 1 hora en milisegundos
- **secure**: `true` (solo en producción) - Solo HTTPS

## Pruebas Recomendadas

### 1. Flujo completo de autenticación

```bash
# 1. Registrar usuario
POST http://localhost:8080/api/sessions/register
Content-Type: application/json

{
  "first_name": "Ana",
  "last_name": "García",
  "email": "ana@mail.com",
  "password": "Secreta123"
}

# 2. Login
POST http://localhost:8080/api/sessions/login
Content-Type: application/json

{
  "email": "ana@mail.com",
  "password": "Secreta123"
}

# Respuesta incluye Set-Cookie con el token

# 3. Consultar usuario actual (enviar cookie)
GET http://localhost:8080/api/sessions/current

# 4. Logout (elimina la cookie)
POST http://localhost:8080/api/sessions/logout
```

### 2. Casos de error

```bash
# Email inexistente
POST http://localhost:8080/api/sessions/login
Content-Type: application/json

{
  "email": "noexiste@mail.com",
  "password": "Secreta123"
}
# Response: 401 "Credenciales inválidas"

# Contraseña incorrecta
POST http://localhost:8080/api/sessions/login
Content-Type: application/json

{
  "email": "ana@mail.com",
  "password": "ContraseñaIncorrecta"
}
# Response: 401 "Credenciales inválidas"

# Sin cookie
GET http://localhost:8080/api/sessions/current
# Response: 401 "No autenticado"

# Token manipulado
GET http://localhost:8080/api/sessions/current
Cookie: currentUser=token_manipulado
# Response: 401 "No autenticado"
```

## Seguridad

✅ **Contraseñas**: Hasheadas con bcrypt (10 salts rounds)  
✅ **JWT**: Firmado con secret en variables de entorno  
✅ **Cookies**: HTTP Only, Same Site Lax, Secure en producción  
✅ **Datos sensibles**: No se devuelve password en respuestas  
✅ **Validación**: Campos obligatorios y formato de email validados  
✅ **Mensajes genéricos**: Login devuelve mensaje único para fallos  

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `8080` |
| `MONGO_URL` | URL de conexión a MongoDB | `mongodb+srv://...` |
| `JWT_SECRET` | Clave secreta para firmar JWT | `mi_secreto_muy_seguro` |
| `JWT_EXPIRES_IN` | Tiempo de expiración del JWT | `1h` |
| `NODE_ENV` | Ambiente de ejecución | `development` o `production` |

## Dependencias

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcrypt**: Hashing de contraseñas
- **jsonwebtoken**: Generación y verificación de JWT
- **cookie-parser**: Parseo de cookies
- **dotenv**: Gestión de variables de entorno
- **mongodb**: Driver oficial de MongoDB

## Autor

Juan José Velasco  
GitHub: [@juanjosevvdev-28](https://github.com/juanjosevvdev-28)

## Licencia

ISC
