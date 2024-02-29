import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Users from './user.model.js';

export const userPost = async (req = request, res = response) => {
    const { NombreUser, CorreoUser, PasswordUser } = req.body;
    const usuario = new Users({NombreUser, CorreoUser, PasswordUser});

    const encript = bcryptjs.genSaltSync();
    usuario.PasswordUser = bcryptjs.hashSync(PasswordUser, encript);

    await usuario.save();
    res.status(200).json({
        usuario
    })

}

