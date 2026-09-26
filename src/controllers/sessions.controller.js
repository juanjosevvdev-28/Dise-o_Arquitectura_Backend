import SessionsService from '../services/sessions.service.js';

class SessionsController {
    async register(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body;

            // Llamar al servicio (que ya valida y hashea)
            const result = await SessionsService.register({ first_name, last_name, email, password });

            // Respuesta exitosa (Ya viene sin la contraseña)
            return res.status(201).json({ status: 'success', payload: result });

        } catch (error) {
            // Capturar errores de negocio (como el email duplicado 409)
            const status = error.statusCode || 500;
            const message = error.message || 'Error en el servidor';
            return res.status(status).json({ status: 'error', message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validación básica
            if (!email || !password) {
                return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
            }

            // Llamar al servicio
            const result = await SessionsService.login(email, password);

            // Si login falla, retornar mensaje genérico
            if (!result) {
                return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
            }

            // Guardar token en cookie
            res.cookie('currentUser', result.token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 3600000, // 1 hora
                secure: process.env.NODE_ENV === 'production'
            });

            return res.status(200).json({ status: 'success', message: 'Login correcto' });

        } catch (error) {
            console.error('Error en login:', error);
            return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
        }
    }

    current(req, res) {
        try {
            // El middleware auth ya pasó y asignó req.user
            return res.status(200).json({ status: 'success', payload: req.user });
        } catch (error) {
            console.error('Error obteniendo usuario actual:', error);
            return res.status(500).json({ status: 'error', message: 'Error en el servidor' });
        }
    }

    logout(req, res) {
        try {
            res.clearCookie('currentUser', {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });

            return res.status(200).json({ status: 'success', message: 'Sesión cerrada' });
        } catch (error) {
            console.error('Error en logout:', error);
            return res.status(500).json({ status: 'error', message: 'Error en el servidor' });
        }
    }
}

export default new SessionsController();
