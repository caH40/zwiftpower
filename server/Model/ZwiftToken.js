import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftTokenSchema = new Schema({
  token: String,
  username: String,
});

export const ZwiftToken = model('ZwiftToken', zwiftTokenSchema);
