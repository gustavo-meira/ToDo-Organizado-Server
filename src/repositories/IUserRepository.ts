import { UserEntity } from '../entities/UserEntity';

interface IUserRepository {
  create(user: UserEntity): Promise<void>;
}

export { IUserRepository };
