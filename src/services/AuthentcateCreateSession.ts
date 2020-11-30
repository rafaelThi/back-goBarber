import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import User from '../models/Users';

import auth from '../config/auth';

interface RequestDTO {
  email: string,
  password: string
}

interface ResponseUser {
  user:User;
   token: string
  }

class AutenticanteCreateSession {
  public async execute({ email, password }:RequestDTO): Promise<ResponseUser> {
    const userRepository = getRepository(User);
    // chamando usuario para autenticar
    const user = await userRepository.findOne({ where: { email } });
    // verificar o email do usuario
    if (!user) {
      throw new AppError('Incorrect dates', 401);
    }
    const passwordMatch = await compare(password, user.password);
    // verificar a senha do usuario

    if (!passwordMatch) {
      throw new AppError('Incorrect dates', 401);
    }
    // gerando token
    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });
    // se tudo bater, retornar algo
    return ({
      user,
      token,
    });
  }
}

export default AutenticanteCreateSession;
