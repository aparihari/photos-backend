import appConfig from '../../../config/app.config';
import httpStatus from '../../../lib/http-status';
import AppError from './app';

export default class AuthError extends AppError {
  constructor(public message: string, statusCode?: number) {
    super(
      message,
      appConfig.loggerSources.APP_SERVER,
      statusCode || httpStatus.UNAUTHORIZED,
    );
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
