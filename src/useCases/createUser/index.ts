import { CryptoPasswordProvider } from '../../providers/implementations/CryptoPasswordProvider';
import { JWTProvider } from '../../providers/implementations/JWTProvider';
import { UUIDProvider } from '../../providers/implementations/UUIDProvider';
import { UserRepository } from '../../repositories/prisma/UserRepository';
import { CreateUser } from './CreateUser';
import { CreateUserController } from './CreateUserController';

const userRepository = new UserRepository();
const uuidProvider = new UUIDProvider();
const cryptoPasswordProvider = new CryptoPasswordProvider();
const jwtProvider = new JWTProvider();
const createUser = new CreateUser(
  userRepository,
  uuidProvider,
  cryptoPasswordProvider,
  jwtProvider,
);
const createUserController = new CreateUserController(createUser);

export { createUserController };
