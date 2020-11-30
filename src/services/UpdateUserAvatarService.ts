/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import upLoaderConfig from '../config/upload';
import User from '../models/Users';
import AppError from '../errors/AppError';

interface RequestUpdate {
  user_id:string;
  avatarFilename:string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestUpdate): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Deve estar Logado para mudar o Avatar.');
    }
    if (user.avatar) {
      // deletar o avatar antigo
      const userAvatarFilePath = path.join(upLoaderConfig.directory, user.avatar);
      const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFilesExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
