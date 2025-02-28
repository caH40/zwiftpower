// types
import { TFinishProtocolConfigDto } from '../types/dto.interface';
import { TFinishProtocolConfig } from '../types/model.interface';

/**
 * DTO данных конфигурации финишного протокола.
 */
export function finishProtocolConfigDto(
  configFP: TFinishProtocolConfig
): TFinishProtocolConfigDto {
  const _id = String(configFP._id);
  const organizer = String(configFP.organizer);
  const createdAt = configFP.createdAt.toISOString();
  const updatedAt = configFP.updatedAt.toISOString();

  return { ...configFP, _id, organizer, createdAt, updatedAt };
}

export function finishProtocolConfigsDto(
  configsFP: TFinishProtocolConfig[]
): TFinishProtocolConfigDto[] {
  return configsFP.map((config) => finishProtocolConfigDto(config));
}
