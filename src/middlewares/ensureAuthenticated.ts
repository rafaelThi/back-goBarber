import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request:Request,
  response:Response, next:NextFunction):void {
// validação do token jwt

  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const deCoded = verify(token, auth.jwt.secret);

    const { sub } = deCoded as TokenPayLoad;
    // forçando o tipo de uma variavel, colocando a interface nela para poder ter acesso aos dados

    request.user = {
      id: sub,
    };
    // aqui adicionamos um novo parametro para o Express

    console.log(deCoded);
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
