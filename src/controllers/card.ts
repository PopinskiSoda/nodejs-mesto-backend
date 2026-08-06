import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
import {
  NOT_FOUND_MESSAGE,
  FORBIDDEN_MESSAGE,
} from '../utils/constants';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_MESSAGE);
    }
    await card.deleteOne();
    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    }
    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    }
    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};
