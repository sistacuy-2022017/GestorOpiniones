import { Router } from 'express';
import { login } from './auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { check } from 'express-validator';
const routers = Router();


routers.post(
    '/',
    [
        check("PasswordUser", "The key is an a caracter obligatory").not().isEmpty(),
        validarCampos
    ],
    login
)


export default routers;