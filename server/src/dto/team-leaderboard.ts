import { createUrlsToFileCloud } from '../utils/url.js';

// types
import { TTeamLeaderboard } from '../types/team.types';
import { TTeamLeaderboardDto } from '../types/dto.interface';

export function teamLeaderboardDto(teams: TTeamLeaderboard[]): TTeamLeaderboardDto[] {
  return teams.map(({ logoFileInfo, posterFileInfo, ...team }) => {
    const logoUrls = createUrlsToFileCloud(logoFileInfo);
    const posterUrls = createUrlsToFileCloud(posterFileInfo);

    return { ...team, logoUrls, posterUrls };
  });
}
