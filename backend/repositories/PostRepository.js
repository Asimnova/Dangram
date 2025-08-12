import Post from '../models/Post.js';

class PostRepository {
  async createPost(postData) {
    const post = new Post(postData);
    return await post.save();
  }

  async getAllPosts() {
    return await Post.find().sort({ createdAt: -1 });
  }

  async findPostById(postId) {
    return await Post.findById(postId);
  }

  async savePost(post) {
    return await post.save();
  }
}

export default new PostRepository();