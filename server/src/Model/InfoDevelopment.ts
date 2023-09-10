import mongoose, { Schema, model } from 'mongoose';

import { InfoDevelopmentSchema } from '../types/model.interface.js';

const infoDevelopmentSchema = new Schema<InfoDevelopmentSchema>({
  postDate: Number, // дата поста релиза
  updateDate: Number, // дата изменения текста релиза
  releaseDate: Number, // дата релиза текущей версии проекта
  version: String, // версия релиза
  userPost: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id пользователя, создавшего пост релиза
  userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id пользователя, изменившего текст релиза
  text: String, // текст релиза
  isFromGitHubActions: { type: Boolean, default: false }, // true если релиз пришел из github автоматически
});

export const InfoDevelopment = model<InfoDevelopmentSchema>(
  'InfoDevelopment',
  infoDevelopmentSchema
);
