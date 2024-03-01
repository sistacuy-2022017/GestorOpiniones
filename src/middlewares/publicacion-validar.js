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

export const existePublicacionById = async (id = '') => {
    const existPubId = await Publications.findOne({ id });

    if(!existPubId){
        throw new Error(`La Publicacion con el ${id} no existe`);
    }
}

// Middleware para verificar si es el propietario
export const verificarPropietario = async (req, res, next) => {

    const id = req.params.id;
  
    const publicacion = await Publications.findById(id);
  
    if(publicacion.Publications != req.userId) {
       return res.status(401).json({msg: 'No autorizado'});
    }
  
    next();
    
}