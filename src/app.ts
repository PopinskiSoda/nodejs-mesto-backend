import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { Request, Response, NextFunction } from 'express';
import './types/express';

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

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
