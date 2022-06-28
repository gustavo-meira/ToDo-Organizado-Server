import { UserEntity } from '../entities/UserEntity';

interface IUserRepository {
  create(user: UserEntity): Promise<void>;
  getByEmail(email: string): Promise<UserEntity | null>;
}

export { IUserRepository };
