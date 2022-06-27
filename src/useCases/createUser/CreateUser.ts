import { UserEntity } from '../../entities/UserEntity';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUser, UserProps } from './ICreateUser';
import { IUUIDProvider } from '../../providers/IUUIDProvider';
import { ICryptoPasswordProvider } from '../../providers/ICryptoPasswordProvider';
import { IJWTProvider } from '../../providers/IJWTProvider';

class CreateUser implements ICreateUser {
  private userRepository: IUserRepository;
  private uuidProvider: IUUIDProvider;
  private cryptoPasswordProvider: ICryptoPasswordProvider;
  private jwtProvider: IJWTProvider;

  constructor(
    userRepository: IUserRepository,
    UUIDProvider: IUUIDProvider,
    cryptoPasswordProvider: ICryptoPasswordProvider,
    jwtProvider: IJWTProvider,
  ) {
    this.userRepository = userRepository;
    this.uuidProvider = UUIDProvider;
    this.cryptoPasswordProvider = cryptoPasswordProvider;
    this.jwtProvider = jwtProvider;
  }

  async execute(user: UserProps): Promise<string> {
    const id = this.uuidProvider.generate();
    const hashedPassword = await this.cryptoPasswordProvider.hash(user.password);

    const userCreated = new UserEntity({
      id,
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    await this.userRepository.create(userCreated);

    const token = this.jwtProvider.sign({ id });

    return token;
  }
}

export { CreateUser };
