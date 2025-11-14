import { MetaTags } from '../types/types.interface.js';
import {
  getOrganizerPublicMeta,
  getProfileResultsMeta,
  getRaceResultsMeta,
  getSeriesRegulationsMeta,
  getSeriesResultsMeta,
  getSeriesScheduleMeta,
  getSignedRidersMeta,
  getTeamAchievementsMeta,
  getTeamMembersMeta,
  getTeamRiderResultsMeta,
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
  getSiteServicesMeta,
  getStatisticsMeta,
  getStreamsMeta,
  getTeamRankingMeta,
  getTeamsMeta,
} from './tags.js';

export const metaHandlers: Record<string, (url: string) => Promise<MetaTags> | MetaTags> = {
  '/': getHomeMeta,
  '/race/schedule': getScheduleListMeta,
  '/race/results': getResultListMeta,
  '/race/statistics/main': getStatisticsMeta,
  '/race/statistics/riders-ftp': getFTPMeta,
  '/race/statistics/riders-racing-score': getRacingScoreMeta,
  '/race/statistics/teams': getTeamRankingMeta,
  '/series': getSeriesMeta,
  '/teams': getTeamsMeta,
  '/moderation/teams/create': getCreateTeamsMeta,
  '/documentation/faq': getFaqMeta,
  '/documentation/public': getPublicDocumentationMeta,
  '/documentation/organizer': getOrganizerDocumentationMeta,
  '/documentation/development': getDevelopmentDocumentationMeta,
  '/site-services': getSiteServicesMeta,
  '/documentation': getDocumentationMeta,
};

const patternHandlers: Array<{
  pattern: RegExp | ((url: string) => boolean);
  handler: (url: string) => Promise<MetaTags> | MetaTags;
}> = [
  { pattern: (url) => url.includes('/race/statistics/leaders/'), handler: getLeadersMeta },
  { pattern: (url) => url.includes('/riders'), handler: getRidersMeta },
  { pattern: (url) => url.includes('/race/results/'), handler: getRaceResultsMeta },
  { pattern: (url) => url.includes('/race/schedule/'), handler: getSignedRidersMeta },
  { pattern: (url) => url.includes('/profile/'), handler: getProfileResultsMeta },
  { pattern: (url) => url.includes('/streams'), handler: getStreamsMeta },
  { pattern: (url) => url.includes('/organizers/'), handler: getOrganizerPublicMeta },
  { pattern: (url) => url.includes('/organizers'), handler: getOrganizersPublicMeta },
  { pattern: /^\/series\/([^/]+)\/(schedule)$/, handler: getSeriesScheduleMeta },
  { pattern: /^\/series\/([^/]+)\/(regulations)$/, handler: getSeriesRegulationsMeta },
  { pattern: /^\/series\/([^/]+)\/(results)$/, handler: getSeriesResultsMeta },
  { pattern: /^\/teams\/[^/]+\/(results)/, handler: getTeamRiderResultsMeta },
  { pattern: /^\/teams\/[^/]+\/members/, handler: getTeamMembersMeta },
  { pattern: /^\/teams\/[^/]+\/achievements/, handler: getTeamAchievementsMeta },
  {
    pattern: /^\/documentation\/[^/]+\/[^?]+\?extension=[^&]+$/,
    handler: getTeamAchievementsMeta,
  },
];

export const getMetaTags = async (url: string): Promise<MetaTags> => {
  // Проверка точных совпадений.

  if (metaHandlers[url]) {
    return metaHandlers[url](url);
  }

  // Проверка паттернов.
  for (const { pattern, handler } of patternHandlers) {
    const matches = typeof pattern === 'function' ? pattern(url) : pattern.test(url);

    if (matches) {
      return handler(url);
    }
  }

  return getMetaOtherPages(url);
};
