import mongoose from 'mongoose';

import appConfig from '../../config/app.config';
import messageConfig from '../../config/message.config';
import errorHandler from '../error/error-handler';
import logger from '../log/services/logger.service';

export class AppDB {
  public async connect() {
    if (process.env.NODE_ENV === appConfig.NODE_ENV.DEVELOPMENT) {
      mongoose.set(
        'debug',
        (collection: any, method: any, query: any, doc: any, options: any) => {
          const set = {
            collection,
            method,
            query,
            doc,
            options,
          };

          logger.info({
            message: messageConfig.DB.LOG,
            queryInfo: set,
          });
        },
      );
    }

    return mongoose
      .connect(process.env.MONGODB_URI as string)
      .then(() => {
        logger.info({
          source: appConfig.loggerSources.MONGOOSE,
          message: messageConfig.DB.CONNECTION_SUCCESS,
        });

        mongoose.connection.on('error', (error: mongoose.Error) => {
          errorHandler.handleError(error);
        });
      })
      .catch((error) => {
        errorHandler.handleError(error);
      });
  }

  public async close() {
    return mongoose.connection
      .close()
      .then(() => {
        logger.info({
          source: appConfig.loggerSources.MONGOOSE,
          message: messageConfig.DB.CLOSE_SUCCESS,
        });
      })
      .catch((error) => {
        errorHandler.handleError(error);
      });
  }
}

export default new AppDB();
