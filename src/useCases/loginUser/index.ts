import { CryptoPasswordProvider } from '../../providers/implementations/CryptoPasswordProvider';
import { JWTProvider } from '../../providers/implementations/JWTProvider';
import { UserRepository } from '../../repositories/prisma/UserRepository';
import { LoginUser } from './LoginUser';
import { LoginUserController } from './LoginUserController';

const userRepository = new UserRepository();
const cryptoPasswordProvider = new CryptoPasswordProvider();
const jwtProvider = new JWTProvider();

const loginUser = new LoginUser(userRepository, cryptoPasswordProvider, jwtProvider);
const loginUserController = new LoginUserController(loginUser);

export { loginUserController };
