import appServer from '../..';
import logger from '../log/services/logger.service';

export class ErrorHandler {
  public async handleError(error: Error) {
    await logger.error({ ...error, stack: error.stack });
  }

  public setupErrorHandler(): void {
    process.on('uncaughtException', async (error: Error) => {
      await logger.error(error);
      appServer.shutdownGracefully(error, () => {
        process.exit(1);
      });
    });
  }
}

export default new ErrorHandler();
