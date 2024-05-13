import { Router } from 'express';
const router = Router();
import { createLeadController, getLeadByIdController, updateLeadController, deleteLeadController, getAllLeadsController } from '../controllers/leadController.js';
import { leadValidationRules } from '../middlewares/validationMiddleware.js';

router.post('/:dealerId/leads/', createLeadController);
router.get('/:dealerId/leads/:leadId', getLeadByIdController);
router.get('/:dealerId/leads/', getAllLeadsController);
router.put('/:dealerId/leads/:leadId', leadValidationRules(), updateLeadController);
router.delete('/:dealerId/leads/:leadId', deleteLeadController);

export default router;
