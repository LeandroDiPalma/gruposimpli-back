import { createPost, getPostById, updatePost, deletePost, getAllPostsByDealer, searchPosts } from '../services/postService.js';

export const createPostController = async (req, res) => {
    const { dealerId } = req.params; 
    try {
        const postData = { ...req.body, dealer: dealerId }; 
        const post = await createPost(postData);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getPostController = async (req, res) => {
    const { dealerId, postId } = req.params; 
    try {
        const post = await getPostById(postId);
        if (!post || post.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Post not found or does not belong to this dealer' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updatePostController = async (req, res) => {
    const { dealerId, postId } = req.params;
    try {
        const post = await updatePost(postId, req.body);
        if (!post || post.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Post not found or does not belong to this dealer' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePostController = async (req, res) => {
    const { postId } = req.params;
    try {
        const result = await deletePost(postId);
        if (!result) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPostsController = async (req, res) => {
    const { dealerId } = req.params; 
    try {
        const posts = await getAllPostsByDealer(dealerId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchPostsController = async (req, res) => {
    const { dealerId } = req.params;
    const { text } = req.query; 

    if (!text) {
        return res.status(400).json({ message: "Search query is required." });
    }

    try {
        const results = await searchPosts(dealerId, text);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
