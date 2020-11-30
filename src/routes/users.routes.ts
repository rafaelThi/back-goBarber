import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserSevice from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import UsersRepository from '../repositoreis/UsersRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.get('/list', async (request, response) => {
  const listUsers = getCustomRepository(UsersRepository);
  const allUsers = await listUsers.find();

  return response.json(allUsers);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserSevice();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
