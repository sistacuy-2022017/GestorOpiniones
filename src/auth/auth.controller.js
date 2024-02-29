import { response, request } from 'express';
import user from '../users/user.model.js'
import bcryptjs from 'bcryptjs';

export const login = async (req = request, res= response) => {
    const { NombreUser, CorreoUser, PasswordUser } = req.body;
    
    try{
        // verify if correo exist
        const usuario = await user.findOne({CorreoUser});

        if(!usuario){
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            })
        }

        const validPass = bcryptjs.compare(PasswordUser, usuario.PasswordUser);
        if(!validPass){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        const validUserName = await user.findOne({NombreUser});

        if(!validUserName){
            return res.status(400).json({
                msg: 'El nombre de usuario no esta registrado'
            })
        }

        res.status(200).json({
            msg: 'login insano'
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'comuniquese con el administrador'
        })
    }
}