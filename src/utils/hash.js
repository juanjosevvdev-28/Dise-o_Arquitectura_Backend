import bcrypt from 'bcrypt';

// Hashear contraseña (se usa en el registro)
export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
};

// Validar contraseña (se usará en el login más adelante)
export const isValidPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
