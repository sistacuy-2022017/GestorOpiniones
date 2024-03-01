import { response, request } from 'express';
import Publications from './publications.model.js';


export const publicationsGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { EstadoPublication: true };

    try {
        const [total, publicationss] = await Promise.all([
            Publications.countDocuments(query),
            Publications.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            publicationss,
        });

    } catch (error) {
        console.error('Error al obtener las publicaciones: ', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export const publicationsPost = async (req = request, res = response) => {
    const { Titulo, Categoria, TextoPrincipal, UserComentario, PublicacionUsuarioId } = req.body;
    const publication = new Publications({ Titulo, Categoria, TextoPrincipal, UserComentario, PublicacionUsuarioId });
    console.log(publication);

    await publication.save();

    res.status(200).json({
        publication
    });
}

export const publicationPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, EstadoPublication, ...resto } = req.body;
    await Publications.findByIdAndUpdate(id, resto);

    const publica = await Publications.findOne({ _id: id });

    res.status(200).json({
        msg: 'La publicacion se actualizo correctamente',
        publica
    });
}

/*export const publicationPut = async (req, res) => {
    const { id } = req.params;
    const usuario = req.user;

    // Buscamos la publicación
    const publicacion = await Publications.findById(id);

    // Verificamos que el usuario sea el propietario
    if (publicacion.usuario.toString() !== usuario._id.toString()) {
        return res.status(401).json({ msg: 'No autorizado' });
    }

    // Si es el propietario, actualizamos
    const { _id, EstadoPublicacion, ...resto } = req.body;

    await Publications.findByIdAndUpdate(id, resto);

    res.json({ msg: 'Publicación actualizada' });

}*/

export const publicationDelete = async (req = request, res = response) => {
    const { id } = req.params;
    await Publications.findByIdAndUpdate(id, { EstadoPublication: false });

    const publicaa = await Publications.findOne({ _id: id });

    res.status(200).json({
        msg: 'Publicacion borrada, insano',
        publicaa
    });

}