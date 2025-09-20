import { MetaTags } from '../types/types.interface.js';
import {
  getOrganizerPublicMeta,
  getProfileResultsMeta,
  getRaceResultsMeta,
  getSeriesRegulationsMeta,
  getSeriesResultsMeta,
  getSeriesScheduleMeta,
  getSignedRidersMeta,
} from './tags-async.js';
import {
  getCreateTeamsMeta,
  getDevelopmentDocumentationMeta,
  getDocumentationMeta,
  getFTPMeta,
  getFaqMeta,
  getHomeMeta,
  getLeadersMeta,
  getMetaOtherPages,
  getOrganizerDocumentationMeta,
  getOrganizersPublicMeta,
  getPublicDocumentationMeta,
  getRacingScoreMeta,
  getResultListMeta,
  getRidersMeta,
  getScheduleListMeta,
  getSeriesMeta,
  getStatisticsMeta,
  getStreamsMeta,
  getTeamsMeta,
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
  } else if (url === '/race/statistics/main') {
    tags = getStatisticsMeta(url);
  } else if (url.includes('/race/statistics/leaders/')) {
    tags = getLeadersMeta(url);
  } else if (url === '/race/statistics/riders-ftp') {
    tags = getFTPMeta(url);
  } else if (url === '/race/statistics/riders-racing-score') {
    tags = getRacingScoreMeta(url);
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
  } else if (url.includes('/organizers/')) {
    tags = getOrganizerPublicMeta(url);
  } else if (url.includes('/organizers')) {
    tags = getOrganizersPublicMeta(url);
  } else if (url.match(/^\/series\/([^/]+)\/(schedule)$/)) {
    tags = getSeriesScheduleMeta(url);
  } else if (url.match(/^\/series\/([^/]+)\/(regulations)$/)) {
    tags = getSeriesRegulationsMeta(url);
  } else if (url.match(/^\/series\/([^/]+)\/(results)$/)) {
    tags = getSeriesResultsMeta(url);
  } else if (url === '/series') {
    tags = getSeriesMeta(url);
  } else if (url === '/teams') {
    tags = getTeamsMeta(url);
  } else if (url.includes('/moderation/teams/create')) {
    tags = getCreateTeamsMeta(url);
  } else if (url.includes('/documentation/faq')) {
    tags = getFaqMeta(url);
  } else if (url.includes('/documentation/public')) {
    tags = getPublicDocumentationMeta(url);
  } else if (url.includes('/documentation/organizer')) {
    tags = getOrganizerDocumentationMeta(url);
  } else if (url.includes('/documentation/development')) {
    tags = getDevelopmentDocumentationMeta(url);
  } else if (url.includes('/documentation')) {
    tags = getDocumentationMeta(url);
  } else {
    tags = getMetaOtherPages(url);
  }

  return tags;
};
