import { Schema } from 'mongoose';

// types
import { TSocialLinks } from '../../types/model.interface';

export const SocialLinksSchema = new Schema<TSocialLinks>(
  {
    vk: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  { _id: false }
);
