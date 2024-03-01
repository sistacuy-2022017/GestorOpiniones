import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { userPost } from "./user.controller.js";
import { existeUserByCorreo } from "../middlewares/user-validar.js";
const routers = Router();

routers.post(
    "/",
    [
        check("NombreUser", "this name is require ").not().isEmpty(),
        check("CorreoUser", "this email is require").isEmail(),
        check("PasswordUser", "This password is require").isLength({min: 6,}),
        check("CorreoUser").custom(existeUserByCorreo),
        validarCampos
    ],
    userPost
);

export default routers;