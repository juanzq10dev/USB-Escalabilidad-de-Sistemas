const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        //console.log(post)
        if (!post) {
            return res.status(404).send();
        }
        const comments = post.comments;
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:postId', async (req, res) => {
    try {
        const comment = new Comment(req.body)
        const post = await Post.findByIdAndUpdate(req.params.postId,
            {$push: {comments: comment}});
        if (!post) {
            return res.status(404).send();
        }

        res.status(201).send(comment);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

module.exports = router;