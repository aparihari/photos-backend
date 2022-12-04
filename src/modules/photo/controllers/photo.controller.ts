import { NextFunction, Request, Response } from 'express';

import responseService from '../../../modules/util/services/response.service';
import { EnhancedRequest } from '../../../common/interfaces/enhanced-request.interface';
import Photo from '../models/photo.model';
import fileService from '../../../modules/util/services/file.service';

export const getPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as EnhancedRequest).user;
    const photos = await Photo.find({ userId: user.id });

    return res.json(await responseService.getSuccessResponse(photos));
  } catch (error) {
    throw error;
  }
};

export const savePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as EnhancedRequest).user;
    const photo = await Photo.create({
      data: fileService.base64Encode(req.file?.buffer!),
      userId: user.id,
    });

    return res.json(await responseService.getSuccessResponse(photo));
  } catch (error) {
    throw error;
  }
};

export const deletePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, userId } = req.body;
    const response = await Photo.findOneAndDelete({
      _id: id,
      userId
    });

    return res.json(
      await responseService.getSuccessResponse(
        response || {
          message: 'Photo deleted successfully',
        },
      ),
    );
  } catch (error) {
    throw error;
  }
};
