import { IPost } from '../interfaces/post.interface';
import { Schema, model } from 'mongoose';

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: [true, 'Title already exists, title must be unique'],
      minLength: [3, 'Title must be at least 3 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [5, 'Description must be longer than 5 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minLength: [5, 'Content must be longer than 5 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      minLength: [2, 'Author must be at least 2 characters long'],
    },
    category: {
      type: [String],
      required: [true, 'category is required'],
      default: ['all'],
    },
    tags: {
      type: [String],
      required: [true, 'A tag is required'],
      default: ['all'],
    },
    image: {
      type: String,
      default:
        'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const Post = model<IPost>('Post', PostSchema);
export default Post;
