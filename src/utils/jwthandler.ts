import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } from '../config/env';
import { CustomJwtPayload } from '../types';

const generateAccessToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET || "dev secret" as jwt.Secret, { expiresIn: JWT_EXPIRATION || "7d"} as jwt.SignOptions);
}

const verifyAccessToken = (token:string): CustomJwtPayload => {
    return jwt.verify(token, JWT_SECRET || '') as CustomJwtPayload;
}

const generateRefreshToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET || "dev refresh secret" as jwt.Secret, { expiresIn: JWT_REFRESH_EXPIRATION || "30d" } as jwt.SignOptions);
}

const verifyRefreshToken = (token: string): CustomJwtPayload => {
    return jwt.verify(token, JWT_REFRESH_SECRET || '') as CustomJwtPayload;
}

export { 
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken 
};