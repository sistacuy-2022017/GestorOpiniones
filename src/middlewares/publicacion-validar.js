import Publications from '../publications/publications.model.js';

export const existePublicacionByName = async (Titulo = '') => {
    const tituloMin = Titulo.toLowerCase();

    const existeTittle = await Publications.findOne({
        Titulo: {
            $regex: new RegExp(`^${tituloMin}$`, 'i')
        }
    });

    if(existeTittle){
        throw new Error(`el titulo ${Titulo} ya existe bro`);
    }
}