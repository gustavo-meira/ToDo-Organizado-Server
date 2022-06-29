import { NextFunction, Response } from 'express';
import {
  validateDeadline,
  validateDetails,
  validateStartDate,
  validateStatus,
  validateTitle,
  validateUserId,
} from '../helpers/validators';
import { RequestWithUser } from '../interfaces/RequestWithUser';

const validateNewTask = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  try {
    const {
      title, startDate, deadline, status, details,
    } = req.body;

    const { id: userId } = req.user;

    validateTitle(title);
    validateStartDate(startDate);
    validateDeadline(deadline);
    validateStatus(status);
    validateDetails(details);
    await validateUserId(userId);

    next();
  } catch (err) {
    next(err);
  }
};

export { validateNewTask };
