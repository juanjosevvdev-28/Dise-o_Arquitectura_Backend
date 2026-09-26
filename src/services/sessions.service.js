import UsersRepository from '../repositories/users.repository.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

class SessionsService {
    async register(userData) {
        const { first_name, last_name, email, password } = userData;

        // 1. Normalizar el email (quitar espacios y pasar a minúsculas)
        const normalizedEmail = email.trim().toLowerCase();

        // 2. Verificar si el email ya existe (Evitar duplicados)
        const exists = await UsersRepository.getUserByEmail(normalizedEmail);
        if (exists) {
            const error = new Error('El email ya está registrado');
            error.statusCode = 409; // Código de conflicto
            throw error;
        }

        // 3. Hashear la contraseña de forma segura
        const hashedPassword = await createHash(password);

        // 4. Crear el objeto final para el repositorio (Ignorando cualquier 'role' enviado en el body)
        const newUser = await UsersRepository.createUser({
            first_name,
            last_name,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'user' // Forzamos el valor por defecto para que no se manipule externamente
        });

        return newUser;
    }

    async login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await UsersRepository.getUserByEmail(normalizedEmail);

        if (!user || !(await isValidPassword(password, user.password))) {
            return null;
        }

        const userPayload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };

        return { token: generateToken(userPayload), user: userPayload };
    }
}

export default new SessionsService();
