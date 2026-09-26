import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2), 'utf8');
  }
};

const readUsers = () => {
  ensureStore();
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data || '[]');
};

const writeUsers = (users) => {
  ensureStore();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
};

const normalizeUser = (user) => ({
  ...user,
  toJSON() {
    const copy = { ...this };
    delete copy.password;
    return copy;
  },
});

export const UserModel = {
  async findOne(query = {}) {
    const users = readUsers();
    const found = users.find((user) => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });

    if (!found) return null;
    return normalizeUser(found);
  },

  async findById(id) {
    const users = readUsers();
    const found = users.find((user) => user._id === id);
    if (!found) return null;
    return normalizeUser(found);
  },

  async create(userData) {
    const users = readUsers();
    const newUser = normalizeUser({
      _id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    users.push(newUser);
    writeUsers(users);
    return newUser;
  },
};
