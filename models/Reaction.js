import { Schema, model } from 'mongoose';
import { formatDate } from './util.js';

export const reactionSchema = new Schema({
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
  username: { type: String, required: true},
  createdAt: {type: Date, default: Date.now, get: formatDate},

});
