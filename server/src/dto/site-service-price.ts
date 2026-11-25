import { TSiteServicePriceDto } from '../types/dto.interface.js';
import { TSiteServicePrice } from '../types/model.interface.js';

export function dtoTSiteServicePrice(entity: TSiteServicePrice): TSiteServicePriceDto {
  const _id = entity._id.toString();
  const createdAt = entity.createdAt.toISOString();
  const updatedAt = entity.updatedAt.toISOString();
  return { ...entity, _id, createdAt, updatedAt };
}
