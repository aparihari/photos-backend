import { NextFunction, Request, Response } from 'express';

import responseService from '../../../modules/util/services/response.service';
import { EnhancedRequest } from '../../../common/interfaces/enhanced-request.interface';
import authService from '../services/auth.service';
import userService from '../../../modules/user/services/user.service';
import { rejectTokens } from '../../../modules/token/controllers/token.controller';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json(await _login(req));
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  try {
    (await userService.createUser(body)).withoutSensitiveDetails();
    return res.json(await _login(req));
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return rejectTokens(req, res);
}

///////////////////////////////////////////////////////////////////////////////////

async function _login(req: Request) {
  const { email, password } = req.body;
  const { fingerPrint } = req as EnhancedRequest;
  try {
    const response = await authService.login(email, password, fingerPrint);

    return await responseService.getSuccessResponse(response);
  } catch (error) {
    throw error;
  }
}
