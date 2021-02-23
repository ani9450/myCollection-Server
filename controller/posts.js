
import mongoose from 'mongoose';
import PostMessage from '../model/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log()
        res.status(200).json(postMessage)
    }
    catch (err) {
        res.status(404).json({ message: err.message });

    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);

    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }

}
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message, creator, selectedFile, tags } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

        res.json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });

    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    console.log("Delete id -- server-- ", id);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "post deleted successfully !!" });

}
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'No post with that id' })

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json({ message: "updated post successfully !!" });

}
