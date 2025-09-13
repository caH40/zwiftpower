import { createUrlsToFileCloud } from '../utils/url.js';

// types
import {
  TBannedRiderDto,
  TPendingRiderDto,
  TTeamForListDto,
  TTeamPublicDto,
} from '../types/dto.interface.js';
import { TTeamForListDB, TTeamPublicDB } from '../types/mongodb-response.types.js';
import { RiderProfileSchema } from '../types/model.interface.js';
import { Types } from 'mongoose';

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

export function pendingRiderDto(
  rider: RiderProfileSchema & { _id: Types.ObjectId; requestedAt: Date }
): TPendingRiderDto {
  const requestedAt = rider.requestedAt.toISOString();
  return { ...rider, _id: rider._id.toString(), requestedAt };
}

export function bannedRiderDto(
  rider: RiderProfileSchema & { _id: Types.ObjectId; bannedAt: Date; bannedReason?: string }
): TBannedRiderDto {
  const bannedAt = rider.bannedAt.toISOString();
  return { ...rider, _id: rider._id.toString(), bannedAt, bannedReason: rider.bannedReason };
}
