import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftSignedRidersSchema = new Schema({
  subgroup: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEventSubgroup', required: true },
  id: { type: Number, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  male: { type: Boolean, default: true },
  countryAlpha3: { type: String, default: null },
  countryCode: { type: Number, default: null },
  imageSrc: { type: String, default: null },
  age: { type: Number, default: null },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  subgroupLabel: { type: String, default: 'E' },
});

export const ZwiftSignedRiders = model('ZwiftSignedRiders', zwiftSignedRidersSchema);
