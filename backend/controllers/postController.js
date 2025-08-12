import PostRepository from '../repositories/PostRepository.js';

export const createPost = async (req, res) => {
  try {
    const { user, img, caption } = req.body;
    if (!user || !img) {
      return res.status(400).json({ message: 'User and image URL are required' });
    }
    const post = await PostRepository.createPost({ user, img, caption });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostRepository.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostRepository.findPostById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await PostRepository.savePost(post);
    }
    res.json({ message: 'Post liked', likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text is required' });
    const post = await PostRepository.findPostById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ user: req.user.id, text });
    await PostRepository.savePost(post);
    res.json({ message: 'Comment added', comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostRepository.findPostById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.shares += 1;
    await PostRepository.savePost(post);
    res.json({ message: 'Post shared', shares: post.shares });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};