import { Schema, model } from 'mongoose';
import { formatDate } from './util.js';
import { reactionSchema } from './Reaction.js';

/**
 * Thought schema and model
 */
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, '1-280 chars required'],
      max: [280, '1-280 chars required'],
    },
    //use formatted date for query DD/MM/YYYY
    createdAt: { type: Date, default: Date.now, get: formatDate },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

//virtual reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions ? this.reactions.length : 0;
});

export const Thought = model('thought', thoughtSchema);
