import { Schema } from 'mongoose';

// types
import { TTelegram } from '../../types/model.interface';

export const TelegramSchema = new Schema<TTelegram>(
  {
    group: { type: String },
    channel: { type: String },
  },
  { _id: false }
);
