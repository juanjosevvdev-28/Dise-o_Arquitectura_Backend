import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

const readUsers = () => {
  if (!fs.existsSync(usersFile)) {
    return [];
  }
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data || '[]');
};

class UsersDAO {
  // Devuelve el usuario CON password para poder comparar en login
  async getByEmail(email) {
    const users = readUsers();
    const user = users.find((u) => u.email === email);
    return user || null;
  }

  async getById(id) {
    const users = readUsers();
    const user = users.find((u) => u._id === id);
    return user || null;
  }

  async create(userData) {
    const users = readUsers();
    const newUser = {
      _id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
    
    // Retornar sin password para el registro
    const copy = { ...newUser };
    delete copy.password;
    return copy;
  }
}

export default new UsersDAO();
