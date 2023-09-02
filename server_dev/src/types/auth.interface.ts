import { Types } from 'mongoose';

export interface GenerateToken {
  username: string;
  email: string;
  id: Types.ObjectId;
  role: string;
}
