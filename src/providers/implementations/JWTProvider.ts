import jwt, { SignOptions } from 'jsonwebtoken';
import { IJWTProvider } from '../IJWTProvider';

class JWTProvider implements IJWTProvider {
  private jwt = jwt;
  private secret = process.env.JWT_SECRET as string;

  sign(payload: any): string {
    const options: SignOptions = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };

    return this.jwt.sign(payload, this.secret, options);
  }

  verify<T>(token: string): T | null {
    return this.jwt.decode(token) as T | null;
  }
}

export { JWTProvider };
