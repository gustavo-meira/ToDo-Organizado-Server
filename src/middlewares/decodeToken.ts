import { NextFunction, Response } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import { JWTProvider } from '../providers/implementations/JWTProvider';

type UserWithId = {
  id: string;
}

const decodeToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const jwtProvider = new JWTProvider();

    const token = req.headers.authorization || '';

    if (token === '') {
      throw new UnauthorizedError('"token" not provided');
    }

    const decoded = jwtProvider.verify<UserWithId>(token);

    if (!decoded?.id) {
      throw new UnauthorizedError('"token" is invalid or expired');
    }

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    next(err);
  }
};

export { decodeToken };
