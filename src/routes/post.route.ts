import {
  createPostController,
  deleteAllPostsController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  updatePostImageController,
} from '../controllers/post.controller';
import { upload } from '../helpers/file-upload.helper';
import { Router } from 'express';

const router = Router();
router.post('/create', upload.single('image'), createPostController);
router.patch('/update/:id', updatePostController);
router.patch('/update/:id', updatePostImageController);
router.get('/get', getAllPostsController);
router.get('/get/:id', getPostByIdController);
router.delete('/delete/:id', deletePostController);
// router.delete('/delete', deleteAllPostsController);

export default router;
