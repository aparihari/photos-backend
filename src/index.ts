import { createServer, Server } from 'http';
import dotenv from 'dotenv';

// get env variables before importing other libraries
dotenv.config();

import app from './app';
import appConfig from './config/app.config';
import appDB from './modules/db/db.server';
import logger from './modules/log/services/logger.service';

const PORT = process.env.PORT;

export class AppServer {
  public server: Server;

  constructor() {
    this.server = createServer(app).listen(PORT, () => {
      logger.info({
        source: appConfig.loggerSources.APP_SERVER,
        message: `Server started listening on port: ${PORT}`,
      });
    });
  }

  public async shutdownGracefully(error: Error, cb: any) {
    // close MongoDB connection
    await appDB.close();
    // stop accepting new connection requests
    this.server.close();
  }
}

export default new AppServer();
