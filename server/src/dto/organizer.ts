import jwt from 'jsonwebtoken';
import { ObjectId, Types } from 'mongoose';

// types
import { TOrganizer, TZwiftToken } from '../types/model.interface.js';
import { TZwiftJwtToken } from '../types/http.interface.js';
import { TOrganizerPublicDto, TZwiftTokenDto } from '../types/types.interface.js';

/**
 * Декодирование токена.
 */
function decodeZwiftToken(token: string): TZwiftJwtToken | null {
  return jwt.decode(token, { complete: true }) as TZwiftJwtToken | null;
}

export function transformZwiftTokenToDto(
  token: TZwiftToken & { _id: ObjectId }
): TZwiftTokenDto {
  const decoded = decodeZwiftToken(token.token);

  const tokenDecoded =
    decoded && decoded.payload
      ? {
          expiresAt: new Date(decoded.payload.exp * 1000).toISOString(),
          issuedAt: new Date(decoded.payload.iat * 1000).toISOString(),
          audience: decoded.payload.aud || [],
          userId: decoded.payload.sub || '',
          name: decoded.payload.name || '',
          email: decoded.payload.email || '',
        }
      : null;

  return {
    _id: String(token._id),
    organizerId: token.organizer.toString(),
    tokenDecoded,
    username: token.username,
    importance: token.importance,
  };
}

export function transformZwiftTokensToDto(
  tokens: (TZwiftToken & { _id: ObjectId })[]
): TZwiftTokenDto[] {
  return tokens.map((token) => transformZwiftTokenToDto(token));
}

/**
 * DTO организаторы заездов для клиента.
 */
export function organizersPublicDto({
  organizersFromDB,
}: {
  organizersFromDB: (TOrganizer & { _id: Types.ObjectId })[];
}): TOrganizerPublicDto[] {
  return organizersFromDB.map((organizer) =>
    organizerPublicDto({ organizerFromDB: organizer })
  );
}

/**
 * DTO организатора заездов для клиента.
 */
export function organizerPublicDto({
  organizerFromDB,
}: {
  organizerFromDB: TOrganizer & { _id: Types.ObjectId };
}): TOrganizerPublicDto {
  const {
    _id,
    name,
    label,
    shortName,
    urlSlug,
    clubMain,
    logoSrc,
    backgroundImage,
    description,
    website,
    country,
    socialLinks,
    telegram,
  } = organizerFromDB;

  return {
    id: String(_id),
    name,
    label,
    shortName,
    urlSlug,
    ...(clubMain && {
      clubMain: `https://www.zwift.com/eu/clubs/${clubMain}/join`,
    }),
    ...(logoSrc && { logoSrc }),
    ...(backgroundImage && { backgroundImage }),
    ...(description && { description }),
    ...(website && { website }),
    ...(country && { country }),
    ...(socialLinks && { socialLinks }),
    ...(telegram && {
      telegram: {
        ...(telegram.group && {
          group: `https://t.me/${telegram.group}`,
        }),
        ...(telegram.channel && {
          channel: `https://t.me/${telegram.channel}`,
        }),
      },
    }),
  };
}
