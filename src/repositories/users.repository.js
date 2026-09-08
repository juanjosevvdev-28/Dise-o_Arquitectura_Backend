import UsersDAO from '../dao/users.dao.js';

class UsersRepository {
    async getUserByEmail(email) {
        return await UsersDAO.getByEmail(email);
    }

    async createUser(userData) {
        const userCreated = await UsersDAO.create(userData);

        // Convertimos el documento de Mongoose a objeto limpio para quitar el password de la respuesta
        const userObj = userCreated.toObject();

        return {
            id: userObj._id,
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            email: userObj.email,
            role: userObj.role
        };
    }
}

export default new UsersRepository();
