import { Router } from 'express';
const routerin = Router();
import { check } from 'express-validator';
import { publicationDelete, publicationPut, publicationsGet, publicationsPost } from './publications.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existePublicacionById, existePublicacionByName } from '../middlewares/publicacion-validar.js';


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

routerin.put(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existePublicacionById),
        check("Titulo").custom(existePublicacionByName),
        validarCampos
    ],
    publicationPut
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