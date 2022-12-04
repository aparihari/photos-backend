import appConfig from '../../../config/app.config';
import httpStatus from '../../../lib/http-status';

export default class AppError extends Error {
  constructor(
    public message: string = `Internal Server error occurred, Please contact ${appConfig.loggerSources.APP_SERVER} team!`,
    public source: string = appConfig.loggerSources.APP_SERVER,
    public statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super();

    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }

  static createFromError(e: Error) {
    const error = new AppError(e.message);
    error.stack =
      error.stack?.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;

    return error;
  }
}
