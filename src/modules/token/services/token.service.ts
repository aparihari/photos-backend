import jwt from 'jsonwebtoken';
import UAParser from 'ua-parser-js';

import appConfig from '../../../config/app.config';
import User from '../../../modules/user/models/user.model';

import { AppUser } from '../../user/interfaces/app-user.interface';
import Token from '../models/token.model';

export class TokenService {
  async createAccessToken(user: AppUser) {
    const accessToken = jwt.sign(
      { user: { id: user.id, name: user.name } },
      appConfig.AUTH_KEY,
      {
        expiresIn: appConfig.ACCESS_TOKEN_EXPIRATION_TIME,
      },
    );

    return Promise.resolve(accessToken);
  }

  async createRefreshToken(user: AppUser, fingerPrint: UAParser.IResult) {
    const tokens = await Token.find({ userId: user.id });

    // if there are 3 ore more token associated to the user delete all tokens
    if (tokens.length >= 3) {
      await Token.deleteMany({ userId: user.id });
    }

    const refreshToken = jwt.sign(
      { user: { id: user.id, name: user.name } },
      appConfig.REFRESH_KEY + user.password,
      {
        expiresIn: appConfig.REFRESH_TOKEN_EXPIRATION_TIME,
      },
    );

    // store the refresh token into the database
    const token = new Token({
      userId: user.id,
      refreshToken,
      fingerPrint: fingerPrint.ua,
    });

    await token.save();

    return Promise.resolve(refreshToken);
  }

  async createTokens(user: AppUser, fingerPrint: UAParser.IResult) {
    return Promise.resolve({
      accessToken: await this.createAccessToken(user),
      refreshToken: await this.createRefreshToken(user, fingerPrint),
    });
  }

  async refreshTokens(refreshToken: string, fingerPrint: UAParser.IResult) {
    let userId = null;
    try {
      const {
        user: { id },
      } = jwt.decode(refreshToken) as { user: AppUser };
      userId: id;
    } catch (err) {
      return {};
    }

    if (!userId) {
      return {};
    }

    const user = await User.findOne({ _id: userId }).select('+password');

    if (!user) {
      return {};
    }

    const refreshSecret = appConfig.REFRESH_KEY + user.password;

    try {
      jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
      return {};
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.createTokens(user as AppUser, fingerPrint);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default new TokenService();
