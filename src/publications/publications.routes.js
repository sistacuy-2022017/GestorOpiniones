import { Router } from 'express';
const routerin = Router();
import { check } from 'express-validator';
import { getPublicationById, publicationDelete, publicationPut, publicationsGet, publicationsPost } from './publications.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existePublicacionById, existePublicacionByName } from '../middlewares/publicacion-validar.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

routerin.get(
    "/",
    publicationsGet
);

routerin.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existePublicacionById),
    ],
    getPublicationById
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
    "/:id",
    [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existePublicacionById),
        validarJWT,
        validarCampos,
    ],
    publicationPut
);

routerin.delete(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB").isMongoId(),
        validarJWT,
        validarCampos
    ],
    publicationDelete
);

export default routerin;