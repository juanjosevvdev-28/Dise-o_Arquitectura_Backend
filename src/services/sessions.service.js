import UsersRepository from '../repositories/users.repository.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

class SessionsService {
    async register(userData) {
        const { first_name, last_name, email, password } = userData;

        // 1. Validar que no falten campos
        if (!first_name || !last_name || !email || !password) {
            const error = new Error('Faltan campos obligatorios');
            error.statusCode = 400;
            throw error;
        }

        // 2. Normalizar el email (quitar espacios y pasar a minúsculas)
        const normalizedEmail = email.trim().toLowerCase();

        // 3. Verificar si el email ya existe (Evitar duplicados)
        const exists = await UsersRepository.getUserByEmail(normalizedEmail);
        if (exists) {
            const error = new Error('El email ya está registrado');
            error.statusCode = 409; // Código de conflicto
            throw error;
        }

        // 4. Hashear la contraseña de forma segura
        const hashedPassword = await createHash(password);

        // 5. Crear el usuario (sin password en la respuesta)
        const newUser = await UsersRepository.createUser({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: 'user' // Siempre crea con rol 'user' por defecto
        });

        return newUser;
    }

    async login(email, password) {
        // 1. Validar que no falten campos
        if (!email || !password) {
            return null;
        }

        // 2. Normalizar el email
        const normalizedEmail = email.trim().toLowerCase();

        // 3. Buscar usuario por email
        const user = await UsersRepository.getUserByEmail(normalizedEmail);

        // 4. Si no existe el usuario o la contraseña es incorrecta, retornar null (mensaje genérico)
        if (!user || !(await isValidPassword(password, user.password))) {
            return null;
        }

        // 5. Crear el payload del JWT (sin password)
        const userPayload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };

        // 6. Generar y retornar el token
        return { token: generateToken(userPayload), user: userPayload };
    }
}

export default new SessionsService();
