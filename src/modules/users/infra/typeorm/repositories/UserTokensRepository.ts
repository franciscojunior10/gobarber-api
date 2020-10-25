import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import Usertoken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<Usertoken>;

  constructor() {
    this.ormRepository = getRepository(Usertoken);
  }

  public async findByToken(token: string): Promise<Usertoken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(user_id: string): Promise<Usertoken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
