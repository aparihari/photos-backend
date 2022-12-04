import { NextFunction, Request, Response } from 'express';
import { EnhancedRequest } from 'src/common/interfaces/enhanced-request.interface';

import messageConfig from '../../../config/message.config';
import collections from '../../../lib/collections';
import responseService from '../../../modules/util/services/response.service';
import userService from '../services/user.service';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUser = (req as EnhancedRequest).user;
    const user = await userService.getUser(loggedInUser);

    return res.json(await responseService.getSuccessResponse(user!));
  } catch (error) {
    return next(error);
  }
};

export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const user = await userService.createUser(body);

    return res.json(
      await responseService.getSuccessResponse({
        message: messageConfig.DB.savedDocument(collections.USER, user.name),
      }),
    );
  } catch (error) {
    return next(error);
  }
};
