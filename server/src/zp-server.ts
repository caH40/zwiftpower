import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';

import { mongodb, serverFront, serverPort } from './config/environment.js';
import { routerAuth } from './routes/authentication.js';
import { router } from './routes/routes.js';
import { routerZwift } from './routes/zwift.js';
import { routerRace } from './routes/race.js';
import { routerInformation } from './routes/information.js';
import { routerProfile } from './routes/profile.js';
import { errorHandler } from './errors/error.js';
import { statisticsRouter } from './routes/statistics.js';
import { routerAdmin } from './routes/admin.js';
import { createFitFiles } from './service/zwift/fitfiles/fitfiles.js';

const __dirname = path.resolve();
const PORT = serverPort || 5000;

await mongoose
  .set('strictQuery', true) //в базе будут только данные которые есть в схеме
  .connect(mongodb)
  .then(() => console.log('Connected to Mongo..')) // eslint-disable-line
  .catch((error) => errorHandler(error));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: serverFront,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use('/api/zwift', routerZwift);
app.use('/api/race', routerRace);
app.use('/api/auth', routerAuth);
app.use('/api/race/profile', routerProfile);
app.use('/api/statistics', statisticsRouter);
app.use('/api/information', routerInformation);
app.use('/api/admin', routerAdmin);
await createFitFiles(169979);
app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'build')));
app.get('*', (_, res) =>
  res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'))
);

// запуск сервера на express
const start = async () => {
  try {
    // throw new Error('testing errors');
    app.listen(PORT, () => console.log(`server started on PORT=${PORT}`)); // eslint-disable-line
  } catch (error) {
    errorHandler(error);
  }
};
start();
