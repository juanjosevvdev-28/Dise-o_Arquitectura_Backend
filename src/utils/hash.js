import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Hashear contraseña (se usa en el registro)
export const createHash = async (password) => {
    try {
        const salts = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salts);
    } catch (error) {
        throw new Error(`Error al hashear la contraseña: ${error.message}`);
    }
};

// Validar contraseña (se usará en el login)
export const isValidPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(`Error al comparar contraseñas: ${error.message}`);
    }
};
