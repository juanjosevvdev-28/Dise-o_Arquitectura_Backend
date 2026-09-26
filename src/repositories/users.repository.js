import UsersDAO from '../dao/users.dao.js';

class UsersRepository {
  async getUserByEmail(email) {
    return await UsersDAO.getByEmail(email);
  }

  async getUserById(id) {
    return await UsersDAO.getById(id);
  }

  async createUser(userData) {
    // DAO ya retorna sin password
    return await UsersDAO.create(userData);
  }
}

export default new UsersRepository();
