import bcryptjs from 'bcryptjs';
import { ICryptoPasswordProvider } from '../ICryptoPasswordProvider';

class CryptoPasswordProvider implements ICryptoPasswordProvider {
  private bcryptjs = bcryptjs;

  async hash(password: string): Promise<string> {
    const salt = await this.bcryptjs.genSalt(10);
    return this.bcryptjs.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return this.bcryptjs.compare(password, hash);
  }
}

export { CryptoPasswordProvider };
