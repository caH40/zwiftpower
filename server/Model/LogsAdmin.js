import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const logsAdminSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Number },
  type: { type: String },
  event: {
    id: Number,
    name: String,
    start: Number,
  },
});

export const LogsAdmin = model('LogsAdmin', logsAdminSchema);
