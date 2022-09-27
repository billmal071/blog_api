import Post from '../models/post.model';
import { IPost } from '../interfaces/post.interface';

export const getAllPostsService = async (pages: number, pageSize: number) => {
  const perPage = pageSize || 10;
  const page = pages || 1;
  const skip = (page - 1) * perPage;
  const results = await Post.find().skip(skip).limit(perPage);
  const count = await Post.countDocuments();
  const totalPage = Math.ceil(count / perPage);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;
  return { results, totalPage, page, perPage, hasNextPage, hasPrevPage };
};

export const getPostByIdService = async (id: string) => {
  try {
    return await Post.findById(id);
  } catch (err) {
    return err;
  }
};

export const createPostService = async (post: IPost) => {
  try {
    const newPost = await Post.create(post);
    return newPost;
  } catch (err) {
    return err;
  }
};

// update one
export const updatePostService = async (id: string, post: IPost) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    return updatedPost;
  } catch (err) {
    return err;
  }
};

// delete one
export const deletePostService = async (id: string) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  } catch (err) {
    return err;
  }
};

// delete all
export const deleteAllPostsService = async () => {
  try {
    const deletedAllPosts = await Post.deleteMany({});
    return deletedAllPosts;
  } catch (err) {
    return err;
  }
};
