import { Router } from 'express';
import AuthenticateCreateSession from '../services/AuthentcateCreateSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticanteUser = new AuthenticateCreateSession();

  const authentcateResponseUser = await authenticanteUser.execute({
    email,
    password,
  });

  delete authentcateResponseUser.user.password;

  return response.json(authentcateResponseUser);
});

export default sessionsRouter;
