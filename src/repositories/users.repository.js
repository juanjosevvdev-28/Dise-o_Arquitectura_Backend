import UsersDAO from '../dao/users.dao.js';

class UsersRepository {
  async getUserByEmail(email) {
    return await UsersDAO.getByEmail(email);
  }

  async getUserById(id) {
    return await UsersDAO.getById(id);
  }

  async createUser(userData) {
    const userCreated = await UsersDAO.create(userData);
    return userCreated.toJSON();
  }
}

export default new UsersRepository();
