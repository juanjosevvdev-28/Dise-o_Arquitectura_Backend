import UsersRepository from '../repositories/users.repository.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

class SessionsService {
  async register(userData) {
    const { first_name, last_name, email, password } = userData;

    if (!first_name || !last_name || !email || !password) {
      const error = new Error('Faltan campos obligatorios');
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const exists = await UsersRepository.getUserByEmail(normalizedEmail);
    if (exists) {
      const error = new Error('El email ya está registrado');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await createHash(password);

    const newUser = await UsersRepository.createUser({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user',
    });

    return newUser;
  }

  async login(email, password) {
    if (!email || !password) {
      return null;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await UsersRepository.getUserByEmail(normalizedEmail);

    if (!user || !(await isValidPassword(password, user.password))) {
      return null;
    }

    const userPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return {
      token: generateToken(userPayload),
      user: userPayload,
    };
  }
}

export default new SessionsService();
