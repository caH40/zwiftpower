import { Types } from 'mongoose';

export interface GenerateToken {
  username: string;
  email: string;
  zwiftId?: number;
  id: Types.ObjectId;
  role: string;
  moderator?: {
    clubs: string[];
  };
}
