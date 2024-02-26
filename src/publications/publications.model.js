import mongoose from 'mongoose';

const PublicationSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    }
});

export default mongoose.model('Publication', PublicationSchema);