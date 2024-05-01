import { createAccessory, getAccessoryById, updateAccessory, deleteAccessory, getAllAccessoriesByDealer } from '../services/accessoryService.js';


export const createAccessoryController = async (req, res) => {
    const { dealerId } = req.params; 
    try {
        const accessory = await createAccessory({ ...req.body, dealer: dealerId });
        res.status(201).json(accessory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const getAccessoryController = async (req, res) => {
    const { dealerId, accessoryId } = req.params; 
    try {
        const accessory = await getAccessoryById(accessoryId);
        if (!accessory || accessory.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Accessory not found or does not belong to this dealer' });
        }
        res.status(200).json(accessory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const updateAccessoryController = async (req, res) => {
    const { dealerId, accessoryId } = req.params;
    try {
        const accessory = await updateAccessory(accessoryId, req.body);
        if (!accessory || accessory.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Accessory not found or does not belong to this dealer' });
        }
        res.status(200).json(accessory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteAccessoryController = async (req, res) => {
    const { accessoryId } = req.params;
    try {
        const result = await deleteAccessory(accessoryId);
        if (!result) {
            return res.status(404).json({ message: 'Accessory not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getAllAccessoriesController = async (req, res) => {
    const { dealerId } = req.params; 
    try {
        const accessories = await getAllAccessoriesByDealer(dealerId);
        res.status(200).json(accessories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
