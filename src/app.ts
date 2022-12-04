import express, { Request, Response, Application, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { UAParser } from 'ua-parser-js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import { dirname, join, resolve, sep } from 'path';

import { EnhancedRequest } from './common/interfaces/enhanced-request.interface';
import errorHandler from './modules/error/error-handler';
import appDB from './modules/db/db.server';
import { saveLoggedInUser } from './modules/token/controllers/token.controller';
import httpStatus from './lib/http-status';
import AppError from './modules/error/type/app';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupExternalMiddleware();
    this.mountRoutes();
    this.setupErrorHandlers();
    this.setupDatabase();
  }

  private async setupExternalMiddleware() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
      }),
    );

    // setup client fingerprint
    this.setupClientFingerPrint();
    // setup authentication middleware
    this.setupAuthentication();
  }

  private mountRoutes() {
    this.loadRoutes(resolve(__dirname, 'modules'));
  }

  private loadRoutes(path: string) {
    if (existsSync(path)) {
      readdirSync(path).forEach((item) => {
        const currentPath = join(path, item);
        if (lstatSync(currentPath).isDirectory()) {
          // recursive
          this.loadRoutes(currentPath);
        } else {
          // load routes if the file is route file
          if (
            dirname(item).split(sep).pop() !== 'child' &&
            /\.route\.ts/.test(item)
          ) {
            this.app.use(
              '/api/' + item.replace('.route.ts', ''),
              require(join(currentPath)),
            );
          }
        }
      });
    }
  }

  private setupErrorHandlers() {
    errorHandler.setupErrorHandler();

    // error handling middleware
    this.app.use(
      async (err: Error, req: Request, res: Response, next: NextFunction) => {
        const error =
          err instanceof AppError ? err : AppError.createFromError(err);
        await errorHandler.handleError(error);
        return res
          .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
          .json(err);
      },
    );
  }

  private setupClientFingerPrint() {
    const parser = new UAParser();
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const fingerPrint = parser.setUA(req.headers['user-agent'] || '');
      (req as EnhancedRequest)['fingerPrint'] = fingerPrint.getResult();
      return next();
    });
  }

  private setupAuthentication() {
    this.app.use(saveLoggedInUser);
  }

  private async setupDatabase() {
    await appDB.connect();
  }
}

export default new App().app;
