import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { Request, Response, NextFunction } from 'express';
import './types/express';
import { NOT_FOUND, NOT_FOUND_MESSAGE } from './utils/constants';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6a6866de2823f9f646f53e69',
  };

  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req: Request, res: Response) => {
  res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
});

mongoose.connect(process.env.MONGODB_URL as string);

app.listen(PORT);
