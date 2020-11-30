import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';
import upLoadConfig from './config/upload';

import './database/index';
import AppError from './errors/AppError';

const app = express();
//
app.use(express.json());
app.use('/files', express.static(upLoadConfig.directory));
app.use(routes);
//

app.use((err: Error, request: Request, response:Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      messagege: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    messagege: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server ON -Code 200-');
});
