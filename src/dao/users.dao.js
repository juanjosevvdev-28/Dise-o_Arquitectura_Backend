import { UserModel } from '../models/User.js';

class UsersDAO {
    // Buscar un usuario por su email
    async getByEmail(email) {
        return await UserModel.findOne({ email });
    }

    // Guardar un nuevo usuario en la base de datos
    async create(userData) {
        return await UserModel.create(userData);
    }
}

export default new UsersDAO();
