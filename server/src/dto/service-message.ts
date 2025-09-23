// types

import { TGetAllServiceMessagesForUserDto } from '../types/dto.interface';
import { TServiceMessage } from '../types/model.interface';

export function getAllServiceMessageForUserDto({
  text,
  url,
  title,
  _id,
  createdAt,
}: TServiceMessage): TGetAllServiceMessagesForUserDto {
  const _idStr = _id.toString();
  const createdAtStr = createdAt.toISOString();

  return { title, _id: _idStr, text, url, createdAt: createdAtStr };
}
