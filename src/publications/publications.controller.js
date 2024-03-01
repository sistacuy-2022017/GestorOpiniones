import { response, request } from 'express';
import Publications from './publications.model.js';

export const publicationsPost = async (req = request, res = response) => {
    const { Titulo, Categoria, TextoPrincipal, UserComentario } = req.body;
    const publication = new Publications({ Titulo, Categoria, TextoPrincipal, UserComentario });
    console.log(publication);

    await publication.save();

    res.status(200).json({
        publication
    });
}