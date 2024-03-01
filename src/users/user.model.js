import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    NombreUser: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    CorreoUser: {
        type: String,
        required: [true, "El correo del usuario es obligatorio"],
    },
    PasswordUser: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    EstadoUser: {
        type: Boolean,
        default: true,
    }
})

export default mongoose.model('Users', UserSchema);