import mongoose from 'mongoose';
const { Schema } = mongoose;

const PublicationSchema = mongoose.Schema({
    Titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    Categoria: {
        type: String,
        required: [true, 'La categoria es obligatoria'],
    },
    TextoPrincipal: {
        type: String,
        required: [true, 'el texto principal es obligatoria'],
    },
    UserComentario: {
        type: String,
        required: [true, 'El comentario de usuario es obligatorio'],
    },
    PublicacionUsuarioId: {
        type: String,
        ref: "Users",
        required: [true, 'el id del usuario es obligatorio'],
    },
    EstadoPublication: {
        type: Boolean,
        default: true
    },
});

export default mongoose.model('Publication', PublicationSchema);