import { response, request } from 'express';
import user from '../users/user.model.js'
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';
//import { token } from 'morgan';

export const login = async (req, res) => {
    const { NombreUser, CorreoUser, PasswordUser } = req.body;

    try {
        let userData = null;

        if (NombreUser) {
            userData = await user.findOne({ NombreUser });
        } else if (CorreoUser) {
            userData = await user.findOne({ CorreoUser });
        } else {
            return res.status(400).json({ 
                msg: 'Debe proporcionar un nombre de usuario o correo electrónico.' 
            });
        }

        if (!userData) {
            return res.status(400).json({ 
                msg: 'Usuario no encontrado.' 
            });
        }

        const isPasswordValid = await bcryptjs.compare(PasswordUser, userData.PasswordUser);

        if (!isPasswordValid) {
            return res.status(400).json({ 
                msg: 'Contraseña incorrecta.' 
            });
        }

        const token = await generarJWT(userData.id);

        return res.status(200).json({
            msg: 'Bienvendo al login',
            userData,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error interno del servidor.', error });
    }
};