import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { mongodb, serverFront, serverPort } from './config/environment.js';
import { routerAuth } from './routes/authentication.js';
import { router } from './routes/routes.js';
import { routerZwift } from './routes/zwift.js';
import { routerRace } from './routes/race.js';
import { routerInformation } from './routes/information.js';
import { routerProfile } from './routes/profile.js';
import { handleAndLogError } from './errors/error.js';
import { statisticsRouter } from './routes/statistics.js';
import { routerAdmin } from './routes/admin.js';
import { routerOrganizer } from './routes/organizer.js';
import { setMetaTags } from './meta_tags/meta-tags.js';

// cache
import { getCache } from './middleware/cache.js';
import { createSitemap } from './service/sitemap/generate-sitemap.js';
import { routerOrganizerPublic } from './routes/organizer-public.js';
import { routerSeries } from './routes/series.js';
import { siteServiceRouter } from './routes/site-service.js';
import { paymentsRouter } from './routes/payments.js';
import { notificationsRouter } from './routes/notifications.js';
// import { handleCatchUpSeries } from './temp/handleCatchUpSeries.js';

const __dirname = path.resolve();
const PORT = serverPort || 5000;

await mongoose
  .set('strictQuery', true) //в базе будут только данные которые есть в схеме
  .connect(mongodb)
  .then(() => console.log('Connected to Mongo..')) // eslint-disable-line
  .catch((error) => handleAndLogError(error));

const app = express();

// сжатие текста
const minSizeForCompression = 10000;
app.use(compression({ level: 6, threshold: minSizeForCompression }));

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
app.use('/api/organizer', routerOrganizer);
app.use('/api/organizers', routerOrganizerPublic);
app.use('/api/series', routerSeries);
app.use('/api/site-services', siteServiceRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/notifications', notificationsRouter);

app.use(
  express.static(path.resolve(__dirname, '..', '..', 'client', 'build'), { index: false })
);
app.get('*', async (req, res) => {
  // console.log(req.path);

  const htmlContent = await setMetaTags(req.path);
  res.send(htmlContent);
});

// запуск сервера на express
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on PORT=${PORT}`)); // eslint-disable-line
    // await handleCatchUpSeries({
    //   season: { start: '2024-09-01T00:00:00Z', end: '2025-08-31T23:59:59Z' },
    //   seriesId: '67c58f6629efba9ae533b602',
    // });
    // Первоначальная инициализация, чтобы сразу был после build.
    await createSitemap();
  } catch (error) {
    handleAndLogError(error);
  }
};
start();
