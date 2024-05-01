import { createDealer, getDealerById, updateDealer, deleteDealer, getAllDealers } from '../services/dealerService.js';

export const createDealerController = async (req, res) => {
    console.log("Received request:", req.body);
    try {
        const dealer = await createDealer(req.body);
        console.log("Dealer created:", dealer);
        res.status(201).json(dealer);
    } catch (error) {
        console.error("Error creating dealer:", error);
        res.status(400).json({ message: error.message });
    }
}

export const getDealerController = async (req, res) => {
    try {
        const dealer = await getDealerById(req.params.id);
        if (!dealer) {
            return res.status(404).json({ message: 'Dealer not found' });
        }
        res.status(200).json(dealer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateDealerController = async (req, res) => {
    try {
        const dealer = await updateDealer(req.params.id, req.body);
        if (!dealer) {
            return res.status(404).json({ message: 'Dealer not found' });
        }
        res.status(200).json(dealer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteDealerController = async (req, res) => {
    try {
        await deleteDealer(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllDealersController = async (req, res) => {
    try {
      const dealers = await getAllDealers();
      res.status(200).json(dealers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };