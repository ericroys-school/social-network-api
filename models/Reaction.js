import { Schema, Types } from 'mongoose';
import { formatDate } from './util.js';

/**
 * Reactions schema with no model because
 * it's just used as sub doc for Thought
 */
export const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      min: [1, 'Required between 1-280 chars'],
      max: [280, 'Required between 1-280 chars'],
    },
    username: { type: String, required: true },
    //use the format data to show MM/DD/YYYY format on query
    createdAt: { type: Date, default: Date.now, get: formatDate },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
