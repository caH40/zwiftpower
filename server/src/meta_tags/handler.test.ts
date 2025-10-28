import { expect, it, describe, vi } from 'vitest';

// мок модели Organizer, чтобы не лезла в реальную БД
vi.mock('../Model/Organizer.ts', () => ({
  Organizer: {
    findOne: vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue({
        name: 'Bike-Caucasus',
        posterFileInfo: { url: 'https://zwiftpower.com/Bike-Caucasus.png' },
      }),
    }),
  },
}));

vi.mock('../Model/ZwiftEvent.ts', () => ({
  ZwiftEvent: {
    findOne: vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue({
        imageUrl:
          'https://cdn.zwift.com/club-images/EVENT/0fceb937-d104-4ef6-913c-7fb80daf2418',
        name: 'BCA Sprint Express Tour. Stage 3 ',
        eventStart: '2025-10-23T16:30:00.000+0000',
        organizer: 'BCA',
        typeRaceCustom: 'classicGroup',
      }),
    }),
  },
}));

vi.mock('../Model/NSeries.ts', () => ({
  NSeriesModel: {
    findOne: vi.fn().mockReturnValue({
      populate: vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue({
          posterFileInfo:
            'https://cdn.zwift.com/club-images/EVENT/0fceb937-d104-4ef6-913c-7fb80daf2418',
          name: 'BCA Sprint Express Tour. Stage 3',
          dateStart: new Date('2025-10-23T00:00:00.000Z'),
          dateEnd: new Date('2025-10-23T20:59:59.999Z'),
          organizer: { name: 'BCA' },
          mission: 'BCA',
        }),
      }),
    }),
  },
}));

vi.mock('../Model/Team.ts', () => ({
  TeamModel: {
    findOne: vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue({
        logoFileInfo:
          'https://cdn.zwift.com/club-images/EVENT/0fceb937-d104-4ef6-913c-7fb80daf2418',
        posterFileInfo:
          'https://cdn.zwift.com/club-images/EVENT/0fceb937-d104-4ef6-913c-7fb80daf2418',
        name: 'Vegan Team',
      }),
    }),
  },
}));

import { getMetaTags } from './handler';
import {
  getHomeMeta,
  getResultListMeta,
  getScheduleListMeta,
  getStatisticsMeta,
  getFTPMeta,
  getRacingScoreMeta,
  getSeriesMeta,
  getTeamsMeta,
  getCreateTeamsMeta,
  getFaqMeta,
  getPublicDocumentationMeta,
  getOrganizerDocumentationMeta,
  getDevelopmentDocumentationMeta,
  getSiteServicesMeta,
  getDocumentationMeta,
  getLeadersMeta,
  getRidersMeta,
  getOrganizersPublicMeta,
  getStreamsMeta,
} from './tags';
import {
  getOrganizerPublicMeta,
  getProfileResultsMeta,
  getRaceResultsMeta,
  getSignedRidersMeta,
  getSeriesScheduleMeta,
  getSeriesResultsMeta,
  getSeriesRegulationsMeta,
  getTeamRiderResultsMeta,
  getTeamMembersMeta,
  getTeamAchievementsMeta,
} from './tags-async';

import { MetaTags } from '../types/types.interface.js';

const metaHandlers: Record<string, (url: string) => Promise<MetaTags> | MetaTags> = {
  '/': getHomeMeta,
  '/race/schedule': getScheduleListMeta,
  '/race/results': getResultListMeta,
  '/race/statistics/main': getStatisticsMeta,
  '/race/statistics/riders-ftp': getFTPMeta,
  '/race/statistics/riders-racing-score': getRacingScoreMeta,
  '/series': getSeriesMeta,
  '/teams': getTeamsMeta,
  '/moderation/teams/create': getCreateTeamsMeta,
  '/documentation/faq': getFaqMeta,
  '/documentation/public': getPublicDocumentationMeta,
  '/documentation/organizer': getOrganizerDocumentationMeta,
  '/documentation/development': getDevelopmentDocumentationMeta,
  '/site-services': getSiteServicesMeta,
  '/documentation': getDocumentationMeta,
  '/race/statistics/leaders/male': getLeadersMeta,
  '/race/statistics/leaders/female': getLeadersMeta,
  '/riders': getRidersMeta,
  '/profile/': getProfileResultsMeta,
  '/streams': getStreamsMeta,
  '/organizers': getOrganizersPublicMeta,

  // Динамические.
  '/race/schedule/5158105': getSignedRidersMeta,
  '/race/results/5158105': getRaceResultsMeta,
  '/organizers/bike-caucasus/series': getOrganizerPublicMeta,
  '/organizers/bike-caucasus/schedule': getOrganizerPublicMeta,
  '/series/bca-bca-sprint-express-tour-19102025/schedule': getSeriesScheduleMeta,
  '/series/bca-bca-sprint-express-tour-19102025/regulations': getSeriesRegulationsMeta,
  '/series/bca-bca-sprint-express-tour-19102025/results': getSeriesResultsMeta,
  '/teams/vegan-team/results': getTeamRiderResultsMeta,
  '/teams/vegan-team/members': getTeamMembersMeta,
  '/teams/vegan-team/achievements': getTeamAchievementsMeta,
};

function myIt(url: string, handler: (url: string) => MetaTags | Promise<MetaTags>) {
  it(`должен возвращать корректные мета-теги для ${url}`, async () => {
    const result = await getMetaTags(url);
    const expected = await handler(url);

    // if (url === '/teams/vegan-team/achievements') {
    //   console.log(result);
    //   console.log(expected);
    // }

    expect(result).toEqual(expected);

    // Дополнительная валидация структуры (перестраховка)
    expect(result).toMatchObject({
      title: expect.any(String),
      canonical: expect.any(String),
      description: expect.any(String),
    });
  });
}

describe('metaHandlers', () => {
  for (const [url, handler] of Object.entries(metaHandlers)) {
    myIt(url, handler);
  }
});
