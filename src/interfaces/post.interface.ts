import { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  content: string;
  author: string;
  category: string[];
  tags: string[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
}