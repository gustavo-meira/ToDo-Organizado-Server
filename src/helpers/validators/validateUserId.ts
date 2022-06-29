import { BadRequestError } from '../../errors/BadRequestError';
import { UserRepository } from '../../repositories/prisma/UserRepository';

const validateUserId = async (userId: string) => {
  if (!userId) return;
  if (typeof userId !== 'string') throw new BadRequestError('"userId" must be a string');
  const userRepository = new UserRepository();
  if (!await userRepository.getById(userId)) throw new BadRequestError('"userId" must be a valid user id');
};

export { validateUserId };
