import { createVehicle, getVehicleById, updateVehicle, deleteVehicle, getAllVehiclesByDealer } from '../services/vehicleService.js';

export const createVehicleController = async (req, res) => {
    try {
        const { dealerId } = req.params; 
        const vehicleData = { ...req.body, dealer: dealerId };

        const vehicle = await createVehicle(vehicleData);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getVehicleController = async (req, res) => {
    try {
        const { dealerId, vehicleId } = req.params;
        const vehicle = await getVehicleById(vehicleId); 
        if (!vehicle || vehicle.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Vehicle not found or does not belong to this dealer' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateVehicleController = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await updateVehicle(vehicleId, req.body); 
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteVehicleController = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const result = await deleteVehicle(vehicleId);
        if (!result) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllVehiclesController = async (req, res) => {
    try {
        console.log(req.params)
        const { dealerId } = req.params; 
        const vehicles = await getAllVehiclesByDealer(dealerId); 
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
