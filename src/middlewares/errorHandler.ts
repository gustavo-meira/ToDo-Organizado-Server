import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: 'Something went wrong' });
};

export { errorHandler };
