import { UserModel } from '../models/User.js';

class UsersDAO {
    // Buscar un usuario por su email (con contraseña para login)
    async getByEmail(email) {
        return await UserModel.findOne({ email }).select('+password');
    }

    // Buscar un usuario por ID (sin contraseña)
    async getById(id) {
        return await UserModel.findById(id);
    }

    // Guardar un nuevo usuario en la base de datos
    async create(userData) {
        return await UserModel.create(userData);
    }
}

export default new UsersDAO();
