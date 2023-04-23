import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const stageSchema = new Schema({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
});

export const Stage = model('Stage', stageSchema);
