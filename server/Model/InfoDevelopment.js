import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const infoDevelopmentSchema = new Schema({
  postDate: Number, // дата поста релиза
  updateDate: Number, // дата изменения текста релиза
  releaseDate: Number, // дата релиза текущей версии проекта
  version: String, // версия релиза
  userPost: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id пользователя, создавшего пост релиза
  userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id пользователя, изменившего текст релиза
  text: String, // текст релиза
  isFromGitHubActions: { type: Boolean, default: false }, // true если релиз пришел из github автоматически
});

export const InfoDevelopment = model('InfoDevelopment', infoDevelopmentSchema);
