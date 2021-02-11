
import mongoose from 'mongoose';
import PostMessage from '../model/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();


        res.status(200).json(postMessage)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
            ;
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
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

        const { id: _id } = req.param;

        const post = req.body
        console.log("updatePost id -- server-- ", id);

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: 'No post with that id' })

        console.log("updatePost id 2-- server-- ", id);

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

        res.status(200).json(updatedPost)
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

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'No post with that id' })

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json({ message: "updated post successfully !!" });

}
