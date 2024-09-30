const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');
const { createPost, deletePost, updatePost, getAllUserPost, getSingleUserPost, updateLike, addComment, deleteComment } = require('../controller/postController');

router.post('/create',checkToken,createPost);
router.delete('/delete/:_id',deletePost);
router.put('/update/:_id',checkToken,updatePost);
router.get('/getall', getAllUserPost);
router.get('/getSingleUser',checkToken, getSingleUserPost);
router.put('/updatelike/:postId', checkToken, updateLike)
router.post('/addComment/:postId',checkToken,addComment)
router.delete('/deletecomment/:postId/:commentId',deleteComment)

module.exports = router