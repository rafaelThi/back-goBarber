import { EntityRepository, Repository } from 'typeorm';

import Users from '../models/Users';

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {
  public async findByDate(date: Date) : Promise<Users | null> {
    const findUsers = await this.findOne({
      where: { date },
    });

    return findUsers || null;
  }
}
export default UsersRepository;
