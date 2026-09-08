import SessionsService from '../services/sessions.service.js';

class SessionsController {
    async register(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body;

            // Validación de campos requeridos
            if (!first_name || !last_name || !email || !password) {
                return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
            }

            // Validación básica de formato de email y longitud de password
            if (!email.includes('@') || password.length < 6) {
                return res.status(400).json({ status: "error", message: "Formato de email inválido o contraseña demasiado corta (mínimo 6 caracteres)" });
            }

            // Llamar al servicio
            const result = await SessionsService.register({ first_name, last_name, email, password });

            // Respuesta exitosa (Ya viene formateada sin la contraseña)
            return res.status(201).json({ status: "success", payload: result });

        } catch (error) {
            // Capturar errores de negocio (como el email duplicado 409)
            const status = error.statusCode || 500;
            return res.status(status).json({ status: "error", message: error.message });
        }
    }
}

export default new SessionsController();
