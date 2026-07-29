import { Request, Response } from 'express';
import Card from '../models/card';
import isInvalidDataError from '../utils/errors';
import {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  INVALID_DATA_MESSAGE,
  NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from '../utils/constants';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).json(card);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
      return;
    }
    res.status(200).json(card);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
      return;
    }
    res.status(200).json(card);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });
      return;
    }
    res.status(200).json(card);
  } catch (error) {
    if (isInvalidDataError(error)) {
      res.status(BAD_REQUEST).json({ message: INVALID_DATA_MESSAGE });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: SERVER_ERROR_MESSAGE });
  }
};
