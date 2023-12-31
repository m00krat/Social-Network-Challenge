const { ObjectId } = require('mongoose').Types;
const { User, Post } = require('../models');

module.exports = {
    async getUsers(req,res) {
        try{
            const users = await User.find();
            res.json(users)
        } catch(err){
            console.log(err);
            res.status(404).json(err);
        }
    },
    async getUser(req,res) {
        try{
            const user = await User.findOne({_id: req.params.id})
            .select('-__v')
            .populate('post')
            .populate('user');
    
          if (!user) {
            return res.status(404).json({ message: 'ID not found' })
          }
          res.json({
            user,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.id });
    
          if (!user) {
            return res.status(404).json({ message: 'ID not found' });
          }
          await Post.deleteMany({ _id: { $in: user.post } });
          res.json({ message: 'User/post deleted' })
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'ID not found' });
          }
          res.json(user);
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async addFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$addToSet: { friend: req.params.friendId }},
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'ID not found' });
          }
          res.json(user);
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async deleteFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$pull: { friend: req.params.friendId }},
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'ID not found' });
          }
          res.json(user);
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      }, 
};