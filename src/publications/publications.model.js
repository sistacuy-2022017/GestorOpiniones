import mongoose from 'mongoose';

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
    EstadoPublication: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', PublicationSchema);