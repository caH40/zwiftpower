import jwt from 'jsonwebtoken';

import { TZwiftToken } from '../types/model.interface.js';
import { TZwiftJwtToken } from '../types/http.interface.js';
import { TZwiftTokenDto } from '../types/types.interface.js';

/**
 * Декодирование токена.
 */
function decodeZwiftToken(token: string): TZwiftJwtToken | null {
  return jwt.decode(token, { complete: true }) as TZwiftJwtToken | null;
}

export function transformZwiftTokenToDto(token: TZwiftToken): TZwiftTokenDto {
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
    organizerId: token.organizer.toString(),
    tokenDecoded,
    username: token.username,
    importance: token.importance,
  };
}

export function transformZwiftTokensToDto(tokens: TZwiftToken[]): TZwiftTokenDto[] {
  return tokens.map((token) => transformZwiftTokenToDto(token));
}