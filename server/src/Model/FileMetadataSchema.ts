import { Schema } from 'mongoose';

// types
import { TFileMetadataForCloud } from '../types/model.interface';

export const FileMetadataSchema = new Schema<TFileMetadataForCloud>(
  {
    baseName: {
      type: String,
      trim: true,
    },
    originalExtension: {
      type: String,
      trim: true,
    },
    optimizedExtension: {
      type: String,
      trim: true,
    },
    availableSizes: {
      type: [String],
      enum: ['original', 'large', 'medium', 'small', 'xLarge'],
      default: ['original'],
    },
  },
  { _id: false }
);
