import { CronJob } from 'cron';

import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateAllPowerCurve } from './updates/power-curve.js';
import { scheduleResultsUpdate } from './updates/results_event/results-events.js';
import { updateScheduleEvents } from './updates/schedule/events.js';
import { updateStartInfo } from './updates/schedule/start.js';
import { updateAccessToken } from './zwift/token.js';
import { handleAndLogError } from '../errors/error.js';
import { createSitemap } from './sitemap/generate-sitemap.js';
import {
  millisecondsInDay,
  millisecondsInHour,
  millisecondsIn63Minutes,
  millisecondsIn10Minutes,
} from '../assets/date.js';

import { removeActivityFromFitFile } from './updates/fitfiles.js';
import { updateAllRidersProfiles } from './updates/riders-profile.js';
import { updateRidersDailyMetrics } from './metrics/metrics.js';
import { closeExpiredSeries } from './updates/series.js';
import { CronScheduler } from './CronScheduler.js';
import { NSeriesModel } from '../Model/NSeries.js';
import { SeriesResultsUpdater } from './updates/SeriesResults.js';

// создание sitemap.xml
export async function setTimers() {
  setInterval(async () => {
    await createSitemap();
  }, millisecondsInHour);

  setInterval(async () => {
    try {
      await controlConfirmEmail();
      await controlNewPasswords();
    } catch (error) {
      handleAndLogError(error);
    }
  }, millisecondsInDay);

  setInterval(async () => {
    try {
      // Обновление параметров заездов в расписании (еще не стартовавших)
      await updateScheduleEvents();
      await updateStartInfo();
      await closeExpiredSeries();
    } catch (error) {
      handleAndLogError(error);
    }
  }, millisecondsIn63Minutes);

  // обновление результатов Эвентов
  setInterval(async () => {
    try {
      await scheduleResultsUpdate();
    } catch (error) {
      handleAndLogError(error);
    }
  }, millisecondsIn10Minutes);

  // запуск обновления фитфалов мощности в 2 часа каждую ночь
  new CronJob(
    '0 0 2 * * *',
    async function () {
      console.log(new Date().toLocaleString(), 'Обновление токенов и фитфайлов мощности'); // eslint-disable-line
      await removeActivityFromFitFile();
      await updateAllRidersProfiles();
      await updateAccessToken();
      await updateAllPowerCurve();
      await updateRidersDailyMetrics();
    },
    null,
    true,
    'Europe/Moscow'
  );

  const cronScheduler = new CronScheduler();

  cronScheduler.add({
    name: 'Обновление результатов этапов и генеральной классификации актуальных Туров',
    cronTime: '0 */5 * * * *',
    job: async () => {
      const now = new Date();
      const seriesDB = await NSeriesModel.find(
        { type: 'tour', dateStart: { $lte: now }, dateEnd: { $gte: now } },
        { _id: true }
      ).lean();

      for (const { _id } of seriesDB) {
        try {
          const updater = new SeriesResultsUpdater(_id.toString());
          await updater.update();
        } catch (err) {
          console.error(`Ошибка при обновлении тура ${_id}:`, err); // eslint-disable-line
        }
      }
    },
  });
}
