import { Logger } from 'winston';

import logger from '../logger';

export class LoggerService {
  private _logger: Logger = logger;

  private set logger(value: Logger) {
    this._logger = value;
  }

  private get logger(): Logger {
    return this._logger;
  }

  public getLogger(config?: any): LoggerService {
    if (config) {
      this.logger = this.logger.child(config);
    } else {
      this.logger = logger;
    }

    return this;
  }

  public error(message: any) {
    return Promise.resolve(this.logger.error(message));
  }

  public warn(message: any) {
    return Promise.resolve(this.logger.warn(message));
  }

  public info(message: any) {
    return Promise.resolve(this.logger.info(message));
  }

  public http(message: any) {
    return Promise.resolve(this.logger.http(message));
  }

  public verbose(message: any) {
    return Promise.resolve(this.logger.verbose(message));
  }

  public debug(message: any) {
    return Promise.resolve(this.logger.debug(message));
  }

  public silly(message: any) {
    return Promise.resolve(this.logger.silly(message));
  }
}

export default new LoggerService().getLogger();
