import { createUrlsToFileCloud } from '../utils/url.js';

// types
import { TTeamForListDto } from '../types/dto.interface.js';
import { TTeamForListDB } from '../types/mongodb-response.types.js';

export function dtoTeamForList({
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
