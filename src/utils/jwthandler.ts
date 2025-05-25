import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/env';
import { CustomJwtPayload } from '../types';

const generateToken = (id: string): string => {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    return sign({ id: id }, JWT_SECRET || 'dev secret', { expiresIn: JWT_EXPIRATION || "30d" });
}

const verifyToken = (token:string): CustomJwtPayload => {
    return verify(token, JWT_SECRET || '') as CustomJwtPayload;
}

export { 
    generateToken, 
    verifyToken 
};