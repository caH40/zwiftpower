import { Schema, model } from 'mongoose';

import { TokenSchema } from '../types/model.interface.js';

const zwiftTokenSchema = new Schema<TokenSchema>({
  token: String,
  username: String,
  importance: String, //main,secondary
});

export const ZwiftToken = model<TokenSchema>('ZwiftToken', zwiftTokenSchema);
