import { Types } from 'mongoose';
import { TExternalAccountVk } from './model.interface.js';

export interface GenerateToken {
  username: string;
  email: string;
  zwiftId?: number;
  id: Types.ObjectId;
  role: string;
  photoProfile?: string | null;
  moderator?: {
    clubs: string[];
  };
  externalAccounts?: { vk?: TExternalAccountVk };
}
