import { Router } from 'express';
const routerin = Router();
import { check } from 'express-validator';
import { publicationsPost } from './publications.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existePublicacionByName } from '../middlewares/publicacion-validar.js';


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

export default routerin;