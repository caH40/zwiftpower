import { createUrlsToFileCloud } from '../utils/url.js';

// types
import { TTeamForListDto, TTeamPublicDto } from '../types/dto.interface.js';
import { TTeamForListDB, TTeamPublicDB } from '../types/mongodb-response.types.js';

export function teamForListDto({
  _id,
  name,
  shortName,
  urlSlug,
  logoFileInfo,
  posterFileInfo,
}: TTeamForListDB): TTeamForListDto {
  const _idStr = _id.toString();
  const logoUrls = createUrlsToFileCloud(logoFileInfo);
  const posterUrls = createUrlsToFileCloud(posterFileInfo);

  return { _id: _idStr, name, shortName, urlSlug, logoUrls, posterUrls };
}

export function teamPublicDto(team: TTeamPublicDB): TTeamPublicDto {
  const { logoFileInfo, posterFileInfo, ...currentTeam } = team;
  const _id = team._id.toString();
  const logoUrls = createUrlsToFileCloud(logoFileInfo);
  const posterUrls = createUrlsToFileCloud(posterFileInfo);

  return { ...currentTeam, _id, logoUrls, posterUrls };
}
