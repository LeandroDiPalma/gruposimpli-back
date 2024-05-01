import Dealer from '../models/Dealer.js';
import Post from '../models/post.js';

export const getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId)
            .populate({
                path: 'vehicle',
                select: 'make model year'
            })
            .populate({
                path: 'accessory',
                select: 'name description price'
            });
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw new Error(`Error retrieving post: ${error.message}`);
    }
}


export const createPost = async (postData) => {
    try {
        const post = new Post(postData);
        await post.save();

        const dealer = await Dealer.findById(postData.dealer);
        if (!dealer) {
            throw new Error('Dealer not found');
        }
        dealer.posts.push(post._id);
        await dealer.save();

        console.log('Dealer updated with new post:', dealer);

        return post;
    } catch (error) {
        throw new Error(`Error creating post: ${error.message}`);
    }
}


export const updatePost = async (postId, postData) => {
    try {
        const post = await Post.findByIdAndUpdate(postId, postData, { new: true, runValidators: true });
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw new Error(`Error updating post: ${error.message}`);
    }
}


export const deletePost = async (postId) => {
    try {
        const result = await Post.findByIdAndDelete(postId);
        if (!result) {
            throw new Error('Post not found');
        }
        return { message: 'Post deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting post: ${error.message}`);
    }
}


export const getAllPostsByDealer = async (dealerId) => {
    try {
        if (!dealerId) {
            throw new Error("Dealer ID must be provided.");
        }
        return await Post.find({ dealer: dealerId })
            .populate({
                path: 'vehicle',
                select: 'make model year'
            })
            .populate({
                path: 'accessory',
                select: 'name description price'
            });
    } catch (error) {
        throw new Error(`Error retrieving all post for dealer ${dealerId}: ${error.message}`);
    }
};

export const searchPosts = async (dealerId, searchText) => {
    const regex = new RegExp(searchText, 'i');

    const posts = await Post.find({
        dealer: dealerId,
        $or: [
            { title: regex },
            { 'vehicle.name': regex },
            { 'accessory.name': regex }
        ]
    }).populate('vehicle', 'name')
        .populate('accessory', 'name');

    return posts;
};