import UsersDAO from '../dao/users.dao.js';

class UsersRepository {
    // Obtener usuario por email (incluye password para validar login)
    async getUserByEmail(email) {
        const user = await UsersDAO.getByEmail(email);
        return user;
    }

    // Obtener usuario por ID (sin password)
    async getUserById(id) {
        const user = await UsersDAO.getById(id);
        return user;
    }

    // Crear nuevo usuario - retorna sin password
    async createUser(userData) {
        const userCreated = await UsersDAO.create(userData);
        // Usar toJSON del schema para excluir password
        return userCreated.toJSON();
    }
}

export default new UsersRepository();
