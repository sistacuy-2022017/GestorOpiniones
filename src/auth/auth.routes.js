import { Router } from 'express';
import { login } from './auth.controller';
const routers = Router();


routers.post(
    '/',
    login
)


export default routers;