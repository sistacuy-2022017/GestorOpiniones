import { response, request } from 'express';
import user from '../users/user.model.js'
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';
import { token } from 'morgan';

export const login = async (req = request, res = response) => {
    const { NombreUser, CorreoUser, PasswordUser } = req.body;

    try {
        if (NombreUser && PasswordUser) {
            const userNamePass = await user.findOne({ NombreUser, PasswordUser });
                const token = await generarJWT(userNamePass.id);
            if (userNamePass) {
                return res.status(200).json({
                    msg: 'Bienvenido ingresaste con nombre y clave',
                    userNamePass,
                    token
                });
            }
            return res.status(400).json({
                msg: "quiza estas intentando entrar con email, intenta de nuevo, si no q manco"
            });
        }

        if (CorreoUser && PasswordUser) {
            const validEmUser = CorreoUser.includes('@kinal.edu.gt');
            if (validEmUser) {
                const userMailPass = await user.findOne({ CorreoUser, PasswordUser });
                 const token2 = await generarJWT(userMailPass.id)
                if (userMailPass) {
                    return res.status(200).json({
                        msg: 'Bienvenido ingresaste con mail y clave',
                        userMailPass,
                        token2
                    });
                }
            }
            return res.status(400).json({
                msg: 'ingresar un correo que tenga @kinal.edu.gt o contraseña correcta'
            });
        }

        return res.status(400).json({
            msg: 'no pos saber con que credenciales intenta entrar:c'
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'comuniquese con el administrador'
        })
    }
}