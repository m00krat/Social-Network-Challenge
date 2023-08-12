const { User, Post } = require('../models');

module.exports = {
  
  async getPosts(req, res) {
    try {
      const post = await Post.find();
      res.json(post);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },
  async getPost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
        .select('-__v');

      if (!post) {
        return res.status(404).json({ message: 'ID not found' });
      }

      res.json(post);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },
  async newPost(req, res) {
    try {
      const post = await Post.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { post: post._id} },
        { new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Post created but ID not found' });
      }
      res.json('Post Created');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deletePost(req, res) {
    try {
      const post = await Post.findOneAndDelete({ _id: req.params.id });
  
      if (!post) {
        return res.status(404).json({ message: "ID not found" });
      }
      
      const user = await User.findOneAndUpdate(
        { post: req.params.id },
        { $pull: { post: req.params.id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "ID not found" });
      }
      res.json({ message: "Post deleted" });
    } 
    catch (err) {
      res.json(err);
    }
  },
  async editPost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!post) {
        res.status(404).json({ message: 'ID not found' });
      }

      res.json(post);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },
};