const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;

    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        const likeIndex = post.likes.findIndex(like => like.userId.toString() === userId);
        if (likeIndex === -1) {
            // Add like if not already liked
            post.likes.push({ userId });
        } else {
            // Remove like if already liked
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;