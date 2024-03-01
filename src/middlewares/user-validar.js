import UsersVal from '../users/user.model.js';

export const existeUserByCorreo = async (CorreoUser = '') => {
   const correoMin = CorreoUser.toLowerCase();

    const existeCorreo = await UsersVal.findOne({
        CorreoUser: {
            $regex: new RegExp(`^${correoMin}$`, 'i')
        }
    });

    if(existeCorreo){
        throw new Error(`el usuario con el correo: ${CorreoUser} ya existe mi amigo`)
    }
}