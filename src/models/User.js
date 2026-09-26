import { Schema, model } from 'mongoose';

// Representación del esquema base para un Usuario en etapas posteriores
export const UserSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String, // Se guardará encriptada posteriormente
    role: String      // ej: 'admin', 'user'
};

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'organizer', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true // Guarda la fecha de creación automáticamente
});

export const UserModel = model('User', userSchema);

