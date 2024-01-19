import { MetaTags } from '../types/types.interface.js';
import {
  getCatchupMeta,
  getFTPMeta,
  getHomeMeta,
  getLeadersMeta,
  getMetaOtherPages,
  getResultListMeta,
  getScheduleListMeta,
  getSeriesMeta,
  getStatisticsMeta,
} from './tags.js';

/**
 * Выбор Мета тэгов соответствующих url
 */
export const getMetaTags = (url: string): MetaTags => {
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
  } else if (url.includes('/race/series/catchup/')) {
    tags = getCatchupMeta(url);
  } else {
    tags = getMetaOtherPages(url);
  }

  return tags;
};
