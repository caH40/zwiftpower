import { ZwiftEventSchema, ZwiftResultSchema } from './model.interface.js';

export interface ResultWithEvent extends Omit<ZwiftResultSchema, 'zwiftEventId'> {
  zwiftEventId: ZwiftEventSchema;
}
