// types

import { TGetAllServiceMessagesForUserDto } from '../types/dto.interface';
import { TServiceMessage } from '../types/model.interface';

export function getAllServiceMessageForUserDto({
  text,
  url,
  title,
  _id,
  isRead,
  createdAt,
}: Omit<TServiceMessage, 'recipientUser' | 'initiatorUser'>): TGetAllServiceMessagesForUserDto {
  const _idStr = _id.toString();
  const createdAtStr = createdAt.toISOString();

  return { _id: _idStr, title, text, url, createdAt: createdAtStr, isRead };
}
