import { Response } from 'express';

import httpStatus from '../../../lib/http-status';
import AuthError from '../../../modules/error/type/auth';
import { logType } from '../../../config/logger.config';
import messageConfig from '../../../config/message.config';
import logger from '../../../modules/log/services/logger.service';
import fileService from './file.service';

export class ResponseService {
  public async getSuccessResponse(properties: { [key: string]: any }) {
    await this.logApiResponse({ ...properties });

    return properties;
  }

  public async getFailureResponse(properties: { [key: string]: any }) {
    await this.logApiResponse({ ...properties });

    return properties;
  }

  public async logApiResponse(properties: { [key: string]: any }) {
    return logger.debug({
      message: messageConfig.API.RESPONSE,
      type: logType.API.RESPONSE,
      details: {
        location: fileService.getFileName(__filename),
        res: {
          ...properties,
        },
      },
    });
  }

  public async failedAuthentication(statusCode: number, res: Response) {
    let message = messageConfig.AUTH.UNAUTHORIZED;

    switch (statusCode) {
      case httpStatus.FORBIDDEN:
        message = messageConfig.AUTH.ACCESS_DENIED;
        break;
      default:
        message = messageConfig.AUTH.UNAUTHORIZED;
    }

    const error = new AuthError(message, statusCode);
    return res
      .status(statusCode)
      .json(await this.getFailureResponse({ ...error }));
  }
}

export default new ResponseService();
