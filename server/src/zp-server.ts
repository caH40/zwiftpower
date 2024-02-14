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
import { setMetaTags } from './meta_tags/meta-tags.js';

// cache
import { getCache } from './middleware/cache.js';

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
app.use('/api/statistics', getCache, statisticsRouter);
app.use('/api/information', routerInformation);
app.use('/api/admin', routerAdmin);

app.use(express.static(path.resolve(__dirname, '..', 'client', 'build'), { index: false }));
app.get('*', async (req, res) => {
  const htmlContent = await setMetaTags(req.path);
  res.send(htmlContent);
});

// запуск сервера на express
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on PORT=${PORT}`)); // eslint-disable-line
  } catch (error) {
    errorHandler(error);
  }
};
start();
