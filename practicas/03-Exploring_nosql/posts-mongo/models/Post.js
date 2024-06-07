const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, content: String }],
    likes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }]
});

module.exports = mongoose.model('Post', postSchema);