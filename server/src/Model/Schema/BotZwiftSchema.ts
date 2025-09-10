import { Schema } from 'mongoose';

// types
import { TOrganizerBotZwift } from '../../types/model.interface';

export const BotZwiftSchema = new Schema<TOrganizerBotZwift>(
  {
    token: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { _id: false }
);
