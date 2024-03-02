import Publications from '../publications/publications.model.js';
import Usuario from '../users/user.model.js'
import { publicationPut } from '../publications/publications.controller.js';

export const existePublicacionByName = async (Titulo = '') => {
    const tituloMin = Titulo.toLowerCase();

    const existeTittle = await Publications.findOne({
        Titulo: {
            $regex: new RegExp(`^${tituloMin}$`, 'i')
        }
    });

    if (existeTittle) {
        throw new Error(`el titulo ${Titulo} ya existe bro`);
    }
}

export const existePublicacionById = async (id = '') => {
    const existPubId = await Publications.findOne({ id });

    if (!existPubId) {
        throw new Error(`La Publicacion con el ${id} no existe`);
    }
}
