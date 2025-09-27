// types

import { TGetAllServiceMessagesForUserDto } from '../types/dto.interface';
import { TServiceMessage } from '../types/model.interface';

export function getAllServiceMessageForUserDto({
  text,
  entityUrl,
  entityLogo,
  title,
  _id,
  isRead,
  createdAt,
}: Omit<TServiceMessage, 'recipientUser' | 'initiatorUser'>): TGetAllServiceMessagesForUserDto {
  const _idStr = _id.toString();
  const createdAtStr = createdAt.toISOString();

  return { _id: _idStr, title, text, entityUrl, entityLogo, createdAt: createdAtStr, isRead };
}
