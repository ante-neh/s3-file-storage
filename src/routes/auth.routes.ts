import { Router } from 'express';
import { signIn, signUp, signOut, refreshToken } from '../controllers/auth.controllers' 

const authRouter = Router();
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-out', signOut);
authRouter.post('/refresh-token', refreshToken);

export { authRouter }