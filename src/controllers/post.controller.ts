import { NextFunction, Request, Response } from 'express';
import {
  createPostService,
  deleteAllPostsService,
  deletePostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
} from '../services/post.services';
import { errorResponse, responseHandler } from '../helpers/response-handler.helper';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from '../helpers/do.cdn.helper';
require('dotenv').config();

const BUCKET = process.env.DO_BUCKET as string;

export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file?.originalname) return errorResponse(res, 'File is required', 400);
  if (!req.file?.buffer) return errorResponse(res, 'File is required', 400);
  const params: PutObjectCommandInput = {
    Bucket: BUCKET,
    Key: req.file?.originalname,
    Body: req.file?.buffer,
    ACL: 'public-read',
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    const imageUrl = `https://cdn.apexdv.fra1.digitaloceanspaces.com/${params.Key}`;
    const post = await createPostService({ image: imageUrl, ...req.body });
    return responseHandler(res, 'Post created successfully', 201, true, post);
  } catch (err: any) {
    errorResponse(res, 'An error occurred', err);
    return next(err);
  }
};

export const getAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
  const { page, pageSize } = req.query;
  try {
    const post = await getAllPostsService(page as unknown as number, pageSize as unknown as number);
    return responseHandler(res, 'Post fetched successfully', 200, true, post);
  } catch (err: any) {
    errorResponse(res, err, 401);
    return next(err);
  }
};

export const getPostByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) return errorResponse(res, 'Id is required', 400);
  if (typeof id !== 'string') return errorResponse(res, 'Id must be a string', 400);
  try {
    const post = await getPostByIdService(id);
    return responseHandler(res, 'Post fetched successfully', 200, true, post);
  } catch (err: any) {
    errorResponse(res, err, 401);
    return next(err);
  }
};

// update one
export const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const file = req.file;
  try {
    const post = await updatePostService(id, req.body);
    return responseHandler(res, 'Post updated successfully', 200, true, post);
  } catch (err: any) {
    errorResponse(res, err, 401);
    return next(err);
  }
};

// update image
export const updatePostImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const file = req.file;
  if (!file?.originalname) errorResponse(res, 'File is required', 400);
  if (!file?.buffer) return errorResponse(res, 'File is required', 400);
  const params: PutObjectCommandInput = {
    Bucket: BUCKET,
    Key: req.file?.originalname,
    Body: req.file?.buffer,
    ACL: 'public-read',
  };
  try {
    await s3Client.send(new PutObjectCommand(params));
    const imageUrl = `https://cdn.apexdv.fra1.digitaloceanspaces.com/${params.Key}`;
    const post = await updatePostService(id, { image: imageUrl, ...req.body });
    return responseHandler(res, 'Post updated successfully', 200, true, post);
  } catch (err: any) {
    errorResponse(res, err, 401);
    return next(err);
  }
};

// delete one
export const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const post = await deletePostService(id);
    return responseHandler(res, 'Post deleted successfully', 200, true, post);
  } catch (err: any) {
    errorResponse(res, err, 401);
    return next(err);
  }
};

// delete all
export const deleteAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await deleteAllPostsService();
    return responseHandler(res, 'All posts deleted successfully', 200, true, post);
  } catch (err: any) {
    errorResponse(res, err, 401);
    return next(err);
  }
};
