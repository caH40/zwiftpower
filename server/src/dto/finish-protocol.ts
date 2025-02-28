// types
import { TFinishProtocolConfigDto } from '../types/dto.interface';
import { TFinishProtocolConfigResponseDB } from '../types/mongodb-response.types';

/**
 * DTO данных конфигурации финишного протокола.
 */
export function finishProtocolConfigDto(
  configFP: TFinishProtocolConfigResponseDB
): TFinishProtocolConfigDto {
  const _id = String(configFP._id);
  const organizer = String(configFP.organizer._id);
  const organizerName = configFP.organizer.name;
  const createdAt = configFP.createdAt.toISOString();
  const updatedAt = configFP.updatedAt.toISOString();

  return { ...configFP, _id, organizer, createdAt, updatedAt, organizerName };
}

export function finishProtocolConfigsDto(
  configsFP: TFinishProtocolConfigResponseDB[]
): TFinishProtocolConfigDto[] {
  return configsFP.map((config) => finishProtocolConfigDto(config));
}
