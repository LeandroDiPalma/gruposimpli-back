import { Router } from 'express';
const router = Router();
import { createAccessoryController, getAccessoryController, updateAccessoryController, deleteAccessoryController, getAllAccessoriesController } from '../controllers/accessoryController.js';
import { accessoryValidationRules } from '../middlewares/validationMiddleware.js';

router.post('/:dealerId/accessories/', accessoryValidationRules(), createAccessoryController);
router.get('/:dealerId/accessories/:accessoryId', getAccessoryController);
router.get('/:dealerId/accessories/', getAllAccessoriesController);
router.put('/:dealerId/accessories/:accessoryId', accessoryValidationRules(), updateAccessoryController);
router.delete('/:dealerId/accessories/:accessoryId', deleteAccessoryController);

export default router;
