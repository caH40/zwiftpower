import { createUrlsToFileCloud } from '../utils/url.js';

// types
import { TTeamLeaderboard } from '../types/team.types';
import { TTeamLeaderboardDto, TTeamTopLeaderboardDto } from '../types/dto.interface';
import { TTeam, TTeamSeasonRating } from '../types/model.interface.js';

export function teamLeaderboardDto(teams: TTeamLeaderboard[]): TTeamLeaderboardDto[] {
  return teams.map(({ logoFileInfo, posterFileInfo, ...team }) => {
    const logoUrls = createUrlsToFileCloud(logoFileInfo);
    const posterUrls = createUrlsToFileCloud(posterFileInfo);

    return { ...team, logoUrls, posterUrls };
  });
}

export function teamTopLeaderboardDto(
  teams: (Omit<TTeamSeasonRating, 'team'> & {
    team: TTeam;
  })[]
): TTeamTopLeaderboardDto[] {
  return teams.map(
    ({ team: { logoFileInfo, posterFileInfo, name, urlSlug, shortName }, rank, points }) => {
      const logoUrls = createUrlsToFileCloud(logoFileInfo);
      const posterUrls = createUrlsToFileCloud(posterFileInfo);

      return { name, shortName, urlSlug, logoUrls, posterUrls, rank, points };
    }
  );
}
