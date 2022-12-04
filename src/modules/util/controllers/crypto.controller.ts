import { NextFunction, Request, Response } from 'express';

import cryptoService from '../services/crypto.service';

export const encryptText = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, algorithm } = req.body;
    return res.send(cryptoService.encrypt(text, algorithm));
  } catch (error) {
    next(error);
  }
};

export const decryptText = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, algorithm } = req.body;
    return res.send(cryptoService.decrypt(text, algorithm));
  } catch (error) {
    next(error);
  }
};

export const createHash = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, algorithm } = req.body;
    return res.send(cryptoService.hash(text, algorithm));
  } catch (error) {
    next(error);
  }
};
