import mongoose, { Document, Schema, model, UpdateQuery } from 'mongoose';

import { TZwiftToken } from '../types/model.interface.js';
import { decrypt, encrypt } from '../utils/aesUtils.js';

/**
 * Схема для Zwift token бота-модератора клуба в Звифт.
 */
const zwiftTokenSchema = new Schema<TZwiftToken & Document>(
  {
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer' },
    token: { type: String, required: true },
    username: { type: String, required: true },
    iv: { type: String }, // IV для дешифровки
    importance: { type: String, enum: ['main', 'secondary'] },
  },
  { timestamps: true }
);

//  Pre-hook для шифрования токена перед сохранением в БД.
zwiftTokenSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as UpdateQuery<TZwiftToken>;

  if (update.$set && update.$set.token) {
    const { encryptedData, iv } = encrypt(update.$set.token);
    update.$set.token = encryptedData;
    update.$set.iv = iv;
  } else if (update.token) {
    // Для случая, если токен передан напрямую без $set
    const { encryptedData, iv } = encrypt(update.token);
    update.token = encryptedData;
    update.iv = iv;
  }

  next();
});

//  Post-hook для дешифрования токена после выполнения findOne.
zwiftTokenSchema.post('findOne', function (doc) {
  if (doc && doc.token && doc.iv) {
    doc.token = decrypt(doc.token, doc.iv);
  }
});

// Post-hook для дешифрования токена после выполнения find.
zwiftTokenSchema.post('find', function (docs) {
  for (const doc of docs) {
    if (doc.token && doc.iv) {
      doc.token = decrypt(doc.token, doc.iv);
    }
  }
});

export const ZwiftToken = model<TZwiftToken & Document>('ZwiftToken', zwiftTokenSchema);
