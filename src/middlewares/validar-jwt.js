import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la solicitud",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(decoded.uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }

        if (!usuario.EstadoUser) {
            return res.status(401).json({
                msg: 'Token inválido - usuario con estado: false'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.error('Error al verificar el token JWT:', error);
        return res.status(401).json({
            msg: "Token JWT no válido",
        });
    }
}