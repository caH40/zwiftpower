import mongoose, { Schema, model } from 'mongoose';

import { TotalCatchupSchema } from '../types/model.interface.js';

const totalCatchupSchema = new Schema<TotalCatchupSchema>({
  type: String,
  start: { type: Number, required: true },
  end: { type: Number },
  update: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: Number,
  },
  manual: [
    {
      dateStart: Number,
      winnerCategory: String,
      create: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        data: Number,
      },
      _id: false,
    },
  ],
});

export const TotalCatchup = model<TotalCatchupSchema>('TotalCatchup', totalCatchupSchema);

// ручное добавление модели
// TotalCatchup.create({
//   type: 'catchUp',
//   start: 1661990400000,
//   end: 1693526400000,
//   update: { user: '6429eaf87f7c28921f385082', data: 1689055207275 },
//   manual: [
//     {
//       dateStart: 1688169600000,
//       winnerCategory: 'B',
//       create: {
//         user: '6429eaf87f7c28921f385082',
//         data: 1689055207275,
//       },
//     },
//   ],
// });
