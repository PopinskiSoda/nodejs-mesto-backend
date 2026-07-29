import { Request, Response } from 'express';
import User from '../models/user';
import isInvalidDataError from '../utils/errors';
import {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  INVALID_DATA_MESSAGE,
  NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from '../utils/constants';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(201).json(user);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};
