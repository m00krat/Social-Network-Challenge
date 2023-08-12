const router = require('express').Router();
const {
  getPosts,
  getPost,
  newPost,
  deletePost,
  editPost,
} = require('../../controllers/postController');

router.route('/').get(getPosts).post(newPost);
router.route("/:id").get(getPost).delete(deletePost).put(editPost);

module.exports = router;