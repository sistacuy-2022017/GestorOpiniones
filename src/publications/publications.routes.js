import { Router } from 'express';
const routerin = Router();
import { check } from 'express-validator';
import { publicationDelete, publicationPut, publicationsGet, publicationsPost } from './publications.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existePublicacionById, existePublicacionByName } from '../middlewares/publicacion-validar.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {  verificarPropietario } from '../middlewares/publicacion-validar.js'

routerin.get(
    "/",
    publicationsGet
);


routerin.post(
    "/",
    [
        check("Titulo", "this is a parameter obligatory").not().isEmpty(),
        check("Categoria", "This is a parameter obligatory").not().isEmpty(),
        check("TextoPrincipal", "This is a parameter obligatory").not().isEmpty(),
        check("UserComentario", "This is a parameter obligatory").not().isEmpty(),
        check("Titulo").custom(existePublicacionByName),
        validarCampos
    ],
    publicationsPost
);

// Ruta PUT 
routerin.put(
    '/:id',
    [
        validarJWT,
        verificarPropietario
    ],

    publicationPut

  /*  async (req, res) => {
        res.json({ msg: 'Publicación actualizada!' });
    }*/
);

routerin.delete(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existePublicacionById),
    ],
    publicationDelete
);

export default routerin;