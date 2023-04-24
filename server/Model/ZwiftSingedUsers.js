import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftSingedUsersSchema = new Schema({
  subgroup: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEventSubgroup', required: true },
  id: { type: Number, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  male: { type: Boolean, default: true },
  countryAlpha3: { type: String, default: null },
  countryCode: { type: Number, default: null },
  imageSrc: { type: String, default: null },
});

export const ZwiftSingedUsers = model('ZwiftSingedUsers', zwiftSingedUsersSchema);
