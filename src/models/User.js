import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true
        },
        last_name: {
            type: String,
            required: [true, 'El apellido es obligatorio'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'El email no es válido']
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            select: false // No devolver password por defecto
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);

// Nunca devolver password en toJSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const UserModel = model('User', userSchema);
