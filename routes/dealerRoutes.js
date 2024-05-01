import { Router } from 'express';
const router = Router();
import { getDealerController, updateDealerController, deleteDealerController, createDealerController, getAllDealersController } from '../controllers/dealerController.js';
import { dealerValidationRules } from '../middlewares/validationMiddleware.js';

router.post('/', createDealerController);
router.get('/:id', dealerValidationRules(), getDealerController);
router.get('/', getAllDealersController);
router.put('/:id', dealerValidationRules(), updateDealerController);
router.delete('/:id', deleteDealerController);

export default router;
