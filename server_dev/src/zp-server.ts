import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';

import { mongodb } from './config/env.js';

import { routerAuth } from './routes/authentication.js';
import { router } from './routes/routes.js';
import { timers } from './service/timer.js';
import { routerZwift } from './routes/zwift.js';
import { routerRace } from './routes/race.js';
import { routerInformation } from './routes/information.js';
import { routerProfile } from './routes/profile.js';

const __dirname = path.resolve();
const PORT = process.env.SERVER_PORT || 5000;

await mongoose
  .connect(mongodb)
  .then(() => console.log('Connected to Mongo..'))
  .catch((error) => console.log(error));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use('/api/zwift', routerZwift);
app.use('/api/race', routerRace);
app.use('/api/auth', routerAuth);
app.use('/api/race/profile', routerProfile);
app.use('/api/information', routerInformation);
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
app.get('*', (_, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
);

const start = async () => {
  try {
    app.listen(PORT, () => console.log('server started on PORT=' + PORT));

    await timers();
  } catch (e) {
    console.log(e);
  }
};
start();
