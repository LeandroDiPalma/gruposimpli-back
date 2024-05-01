import { Router } from 'express';
const router = Router();
import { createPostController, getPostController, updatePostController, deletePostController, getAllPostsController, searchPostsController } from '../controllers/postController.js';
import { postValidationRules } from '../middlewares/validationMiddleware.js';

router.get('/:dealerId/posts/search', searchPostsController);
router.post('/:dealerId/posts/', postValidationRules(), createPostController);
router.get('/:dealerId/posts/:postId', getPostController);
router.get('/:dealerId/posts/', getAllPostsController);
router.put('/:dealerId/posts/:postId', postValidationRules(), updatePostController);
router.delete('/:dealerId/posts/:postId', deletePostController);

export default router;
