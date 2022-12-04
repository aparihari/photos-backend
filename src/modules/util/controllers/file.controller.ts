import { NextFunction, Request, Response } from 'express';

import { EnhancedRequest } from '../../../common/interfaces/enhanced-request.interface';
import fileService from '../services/file.service';

export const getBase64EncodedContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = (req as EnhancedRequest).file;
    return res.send(fileService.base64Encode(file.buffer));
  } catch (error) {
    return next(error);
  }
};

export const getBase64DecodedContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const decodedImage = fileService.base64Decode(payload.image);
    return res.contentType('image/jpeg').send(decodedImage);
  } catch (error) {
    return next(error);
  }
};
