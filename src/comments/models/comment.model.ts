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
  // TODO: add in editedAt timestamp then a virtual field about whether it has been edited or not
});

export const Comment = mongoose.model('comment', commentSchema);
