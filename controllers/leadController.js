import { createLead, getLeadById, updateLead, deleteLead, getAllLeadsByDealer } from '../services/leadService.js';

export const createLeadController = async (req, res) => {
    const { dealerId } = req.params; 
    try {
        const leadData = { ...req.body, dealer: dealerId }; 
        const lead = await createLead(leadData);
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLeadByIdController = async (req, res) => {
    const { dealerId, leadId } = req.params; 
    try {
        const lead = await getLeadById(leadId);
        if (!lead || lead.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Lead not found or does not belong to this dealer' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateLeadController = async (req, res) => {
    const { dealerId, leadId } = req.params;
    try {
        const lead = await updateLead(leadId, req.body);
        if (!lead || lead.dealer.toString() !== dealerId) {
            return res.status(404).json({ message: 'Lead not found or does not belong to this dealer' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteLeadController = async (req, res) => {
    const { leadId } = req.params;
    try {
        const result = await deleteLead(leadId);
        if (!result) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(204).send({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLeadsController = async (req, res) => {
    const { dealerId } = req.params; 
    try {
        const leads = await getAllLeadsByDealer(dealerId);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
