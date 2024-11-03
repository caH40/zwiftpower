import { MetaTags } from '../types/types.interface.js';
import {
  getProfileResultsMeta,
  getRaceResultsMeta,
  getSignedRidersMeta,
} from './tags-async.js';
import {
  getCatchupMeta,
  getFTPMeta,
  getFaqMeta,
  getHomeMeta,
  getLeadersMeta,
  getMetaOtherPages,
  getRacingScoreMeta,
  getResultListMeta,
  getRidersMeta,
  getScheduleListMeta,
  getSeriesMeta,
  getStatisticsMeta,
  getStreamsMeta,
} from './tags.js';

/**
 * Выбор Мета тэгов соответствующих url
 */
export const getMetaTags = async (url: string): Promise<MetaTags> => {
  let tags;

  if (url === '/') {
    tags = getHomeMeta();
  } else if (url === '/race/schedule') {
    tags = getScheduleListMeta(url);
  } else if (url === '/race/results') {
    tags = getResultListMeta(url);
  } else if (url === '/race/series') {
    tags = getSeriesMeta(url);
  } else if (url === '/race/statistics/main') {
    tags = getStatisticsMeta(url);
  } else if (url.includes('/race/statistics/leaders/')) {
    tags = getLeadersMeta(url);
  } else if (url === '/race/statistics/riders-ftp') {
    tags = getFTPMeta(url);
  } else if (url === '/race/statistics/riders-racing-score') {
    tags = getRacingScoreMeta(url);
  } else if (url.includes('/race/series/catchup/')) {
    tags = getCatchupMeta(url);
  } else if (url.includes('/faq')) {
    tags = getFaqMeta(url);
  } else if (url.includes('/riders')) {
    tags = getRidersMeta(url);
  } else if (url.includes('/race/results/')) {
    tags = await getRaceResultsMeta(url);
  } else if (url.includes('/race/schedule/')) {
    tags = await getSignedRidersMeta(url);
  } else if (url.includes('/profile/')) {
    tags = await getProfileResultsMeta(url);
  } else if (url.includes('/streams')) {
    tags = getStreamsMeta(url);
  } else {
    tags = getMetaOtherPages(url);
  }

  return tags;
};
