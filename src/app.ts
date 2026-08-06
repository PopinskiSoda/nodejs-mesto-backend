import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import './types/express';
import { NOT_FOUND_MESSAGE } from './utils/constants';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';
import { validateSignin, validateSignup } from './middlewares/validations';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(requestLogger);

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});
app.use(errorLogger);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL as string);

app.listen(PORT);
