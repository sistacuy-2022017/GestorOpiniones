import { response, request } from 'express';
import Publications from './publications.model.js';
import Usuario from '../users/user.model.js';
import jwt from 'jsonwebtoken';


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

export const getPublicationById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar todas las publicaciones del usuario por su ID
        const publicaciones = await Publications.find({ PublicacionUsuarioId: id });

        res.status(200).json({ publicaciones });
    } catch (error) {
        console.error('Error al obtener las publicaciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las publicaciones del usuario' });
    }
}


export const publicationPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        // Verificar el token JWT
        const token = req.header('x-token');
        if (!token) {
            console.log('No hay token en la petición');
            return res.status(401).json({ msg: 'No hay token en la petición' });
        }

        // Decodificar el token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
            return res.status(401).json({ msg: 'Token JWT no válido' });
        }

        console.log('Token decodificado:', decoded);

        const userId = decoded.uid;

        console.log('ID de usuario extraído del token:', userId);

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            console.log('Usuario no encontrado en la base de datos');
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Buscar la publicación en la base de datos
        const publicacion = await Publications.findById(id);
        if (!publicacion) {
            console.log('Publicación no encontrada en la base de datos');
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        // Verificar si el usuario es el propietario de la publicación
        if (publicacion.PublicacionUsuarioId !== userId) {
            console.log('El usuario no tiene permiso para actualizar esta publicación');
            return res.status(403).json({ msg: 'No tienes permiso para actualizar esta publicación' });
        }

        // Actualizar la publicación
        const publicacionActualizada = await Publications.findByIdAndUpdate(id, resto, { new: true });

        // Respuesta exitosa con la publicación actualizada
        res.status(200).json({
            msg: 'Publicación actualizada',
            publicacion: publicacionActualizada,
        });
    } catch (error) {
        console.error('Error al actualizar la publicación:', error);
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
};

export const publicationDelete = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar el token JWT
        const token = req.header('x-token');
        if (!token) {
            console.log('No hay token en la petición');
            return res.status(401).json({ msg: 'No hay token en la petición' });
        }

        // Decodificar el token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
            return res.status(401).json({ msg: 'Token JWT no válido' });
        }
        console.log('Token decodificado:', decoded);

        const userId = decoded.uid;
        console.log('ID de usuario extraído del token:', userId);

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            console.log('Usuario no encontrado en la base de datos');
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Buscar la publicación en la base de datos
        const publicacion = await Publications.findById(id);
        if (!publicacion) {
            console.log('Publicación no encontrada en la base de datos');
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        // Verificar si el usuario es el propietario de la publicación
        if (publicacion.PublicacionUsuarioId !== userId) {
            console.log('El usuario no tiene permiso para eliminar esta publicación');
            return res.status(403).json({ msg: 'No tienes permiso para eliminar esta publicación' });
        }

        await Publications.findByIdAndUpdate(id, { EstadoPublication: false });

        const alumno = await Publications.findOne({ _id: id });

        res.status(200).json({
            msg: 'Publicacion Eliminada, se paso de joita',
            alumno
        });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
};