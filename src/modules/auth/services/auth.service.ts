import { NextFunction, Request, Response } from 'express';
import UAParser from 'ua-parser-js';

import AuthError from '../../../modules/error/type/auth';
import { EnhancedRequest } from '../../../common/interfaces/enhanced-request.interface';
import messageConfig from '../../../config/message.config';
import tokenService from '../../../modules/token/services/token.service';
import {
  AppUser,
  UserDocument,
} from '../../../modules/user/interfaces/app-user.interface';
import User from '../../../modules/user/models/user.model';
import httpStatus from '../../../lib/http-status';

export class AuthService {
  public async login(
    email: string,
    password: string,
    fingerPrint: UAParser.IResult,
  ) {
    const user = (await User.findOne({ email }).select(
      '+password',
    )) as unknown as UserDocument;

    if (!user) {
      throw new AuthError(
        messageConfig.AUTH.INVALID_LOGIN,
        httpStatus.FORBIDDEN,
      );
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      throw new AuthError(
        messageConfig.AUTH.INVALID_LOGIN,
        httpStatus.FORBIDDEN,
      );
    }

    const { accessToken, refreshToken } = await tokenService.createTokens(
      user as AppUser,
      fingerPrint,
    );

    return {
      user: user.withoutSensitiveDetails(),
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if ((req as EnhancedRequest).user) {
      return next();
    }

    throw new AuthError(
      messageConfig.AUTH.UNAUTHORIZED,
      httpStatus.UNAUTHORIZED,
    );
  }
}

export default new AuthService();
