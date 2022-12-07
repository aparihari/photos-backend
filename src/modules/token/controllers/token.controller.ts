import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { EnhancedRequest } from '../../../common/interfaces/enhanced-request.interface';
import httpStatus from '../../../lib/http-status';
import appConfig from '../../../config/app.config';
import authConfig from '../../../config/auth.config';
import tokenService from '../services/token.service';
import responseService from '../../../modules/util/services/response.service';
import messageConfig from '../../../config/message.config';

export const refreshTokens = async (req: Request, res: Response) => {
  const accessToken =
    req.headers['x-access-token'] || req.headers.authorization;
  if (accessToken) {
    try {
      jwt.verify(accessToken as any, appConfig.AUTH_KEY);
      return sendLatestTokens(req, res);
    } catch (error) {
      if (
        (error as any).name === authConfig.tokenErrors.TOKEN_EXPIRATION_ERROR
      ) {
        return sendLatestTokens(req, res);
      } else {
        return responseService.failedAuthentication(
          httpStatus.UNAUTHORIZED,
          res,
        );
      }
    }
  }

  return responseService.failedAuthentication(httpStatus.UNAUTHORIZED, res);
};

export const rejectTokens = async (req: Request, res: Response) => {
  const refreshToken = req.headers['x-refresh-token'] as string;

  if (refreshToken) {
    try {
      await tokenService.rejectTokens(refreshToken);
    } catch (error) {
      return responseService.failedAuthentication(httpStatus.UNAUTHORIZED, res);
    }
  }

  return res.json(
    await responseService.getSuccessResponse({
      message: messageConfig.TOKEN.TOKENS_DELETED,
    }),
  );
};

export const saveLoggedInUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken =
    req.headers['x-access-token'] || req.headers.authorization;
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken as any, appConfig.AUTH_KEY);
      (req as EnhancedRequest).user = (decoded as any).user;
    } catch (error) {
      return next();
    }
  }

  return next();
};

async function sendLatestTokens(req: Request, res: Response) {
  const refreshToken = req.headers['x-refresh-token'] as string;
  const { fingerPrint } = req as EnhancedRequest;

  if (refreshToken) {
    const latestTokens = await tokenService.refreshTokens(
      refreshToken,
      fingerPrint,
    );

    if (latestTokens.accessToken && latestTokens.refreshToken) {
      res.set(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token',
      );
      res.set('x-access-token', latestTokens.accessToken);
      res.set('x-refresh-token', latestTokens.refreshToken);
      return res.json(
        await responseService.getSuccessResponse({ ...latestTokens }),
      );
    }
  }

  return responseService.failedAuthentication(httpStatus.UNAUTHORIZED, res);
}
