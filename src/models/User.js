// Representación del esquema base para un Usuario en etapas posteriores
export const UserSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String, // Se guardará encriptada posteriormente
    role: String      // ej: 'admin', 'user'
};
