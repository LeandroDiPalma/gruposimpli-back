import { Router } from 'express';
const router = Router();
import { createVehicleController, getVehicleController, updateVehicleController, deleteVehicleController, getAllVehiclesController } from '../controllers/vehicleController.js';
import { vehicleValidationRules } from '../middlewares/validationMiddleware.js';



router.post('/:dealerId/vehicles', vehicleValidationRules(), createVehicleController);
router.get('/:dealerId/vehicles/:vehicleId', getVehicleController);
router.get('/:dealerId/vehicles', getAllVehiclesController);
router.put('/:dealerId/vehicles/:vehicleId', vehicleValidationRules(), updateVehicleController);
router.delete('/:dealerId/vehicles/:vehicleId', deleteVehicleController);

export default router;
