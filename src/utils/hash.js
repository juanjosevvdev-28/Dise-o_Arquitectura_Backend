import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createHash = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const isValidPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
