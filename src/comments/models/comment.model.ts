import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Comment must have an author.'],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  body: {
    type: String,
    required: true,
    // TODO: apply max length
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipe',
    required: [true, 'Comment must be tied to a recipe'],
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

commentSchema.virtual('edited').get(function(): boolean {
  return this.updatedAt !== undefined;
});

export const Comment = mongoose.model('comment', commentSchema);
