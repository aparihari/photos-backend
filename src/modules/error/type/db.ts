import appConfig from '../../../config/app.config';
import httpStatus from '../../../lib/http-status';
import AppError from './app';

export default class DbError extends AppError {
  public details: any;

  constructor(
    public message: string,
    public type: number,
    extraInfo: { statusCode?: number; error?: any },
  ) {
    super(
      message,
      appConfig.loggerSources.APP_SERVER,
      extraInfo?.statusCode || httpStatus.BAD_REQUEST,
    );
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.details = {
      isMongoError: !!extraInfo?.error,
      error: extraInfo?.error,
    };
  }
}
