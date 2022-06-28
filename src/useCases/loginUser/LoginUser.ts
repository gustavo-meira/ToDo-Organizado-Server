import { BadRequestError } from '../../errors/BadRequestError';
import { ICryptoPasswordProvider } from '../../providers/ICryptoPasswordProvider';
import { IJWTProvider } from '../../providers/IJWTProvider';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginUser, LoginUserProps } from './ILoginUser';

class LoginUser implements ILoginUser {
  private userRepository: IUserRepository;
  private cryptoPasswordProvider: ICryptoPasswordProvider;
  private jwtProvider: IJWTProvider;

  constructor(
    userRepository: IUserRepository,
    cryptoPasswordProvider: ICryptoPasswordProvider,
    jwtProvider: IJWTProvider,
  ) {
    this.userRepository = userRepository;
    this.cryptoPasswordProvider = cryptoPasswordProvider;
    this.jwtProvider = jwtProvider;
  }

  async execute(loginUserProps: LoginUserProps): Promise<string> {
    const { email, password } = loginUserProps;

    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestError('"email" or "password" is invalid');
    }

    const isValidPassword = await this.cryptoPasswordProvider.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestError('"email" or "password" is invalid');
    }

    const token = this.jwtProvider.sign({ id: user.id });

    return token;
  }
}

export { LoginUser };
