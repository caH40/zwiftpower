import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftTokenSchema = new Schema({
  token: String,
  username: String,
  importance: String,
});

export const ZwiftToken = model('ZwiftToken', zwiftTokenSchema);
