import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import mongoose from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';
import isInvalidDataError from '../utils/errors';
import {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  INVALID_DATA_MESSAGE,
  CONFLICT_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from '../utils/constants';

type AppError =
  | BadRequestError
  | UnauthorizedError
  | ForbiddenError
  | NotFoundError
  | ConflictError;

const isAppError = (err: Error): err is AppError => (
  err instanceof BadRequestError
  || err instanceof UnauthorizedError
  || err instanceof ForbiddenError
  || err instanceof NotFoundError
  || err instanceof ConflictError
);

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (isAppError(err)) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (isCelebrateError(err) || isInvalidDataError(err)) {
    res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
    return;
  }

  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    res.status(CONFLICT).json({ message: CONFLICT_MESSAGE });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
};

export default errorHandler;
