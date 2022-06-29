import { Prisma, PrismaClient } from '@prisma/client';
import { UserEntity } from '../../entities/UserEntity';
import { ConflictError } from '../../errors/ConflictError';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(user: UserEntity): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          username: user.username,
          id: user.id,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          if ((err?.meta?.target as string).includes('email')) {
            throw new ConflictError('"email" must be unique');
          }
          if ((err?.meta?.target as string).includes('username')) {
            throw new ConflictError('"username" already exists');
          }
        }
      }
      throw err;
    }
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      return user ? new UserEntity(user) : null;
    } catch (err) {
      return null;
    }
  }

  async getById(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });
      return user ? new UserEntity(user) : null;
    } catch (err) {
      return null;
    }
  }
}

export { UserRepository };
