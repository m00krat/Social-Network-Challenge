const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
      max_length: 250,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Post = model('post', postSchema);

module.exports = Post;