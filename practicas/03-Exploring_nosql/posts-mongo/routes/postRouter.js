const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).send({ error: 'User ID is required' });
        }
        const posts = await Post.find({ userId }).populate('userId');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id},
            req.body,
            { new: true, runValidators: true }
        );
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id});
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;