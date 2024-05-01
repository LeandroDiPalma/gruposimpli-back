import Dealer from '../models/Dealer.js';
import Lead from '../models/lead.js';

export const createLead = async (leadData) => {
    try {
        const lead = new Lead(leadData);
        await lead.save();

        const dealer = await Dealer.findById(leadData.dealer);
        if (!dealer) {
            throw new Error('Dealer not found');
        }
        dealer.leads.push(lead._id);
        await dealer.save();

        console.log('Dealer updated with new lead:', dealer);
        return lead;
    } catch (error) {
        throw new Error(`Error creating lead: ${error.message}`);
    }
};

export const getLeadById = async (leadId) => {
    const lead = await Lead.findById(leadId)
        .populate({
            path: 'post',
            select: 'title content',
            populate: [
                { path: 'vehicle', select: 'make model year price' }, 
                { path: 'accessory', select: 'name description price' } 
            ]
        });
    if (!lead) {
        throw new Error('Lead not found');
    }
    return lead;
};

export const updateLead = async (leadId, leadData) => {
    const lead = await Lead.findByIdAndUpdate(leadId, leadData, { new: true, runValidators: true });
    if (!lead) {
        throw new Error('Lead not found');
    }
    return lead;
};

export const deleteLead = async (leadId) => {
    const result = await Lead.findByIdAndDelete(leadId);
    if (!result) {
        throw new Error('Lead not found');
    }
    return result;
};

export const getAllLeadsByDealer = async (dealerId) => {
    try {
        if (!dealerId) {
            throw new Error("Dealer ID must be provided.");
        }
        return await Lead.find({ dealer: dealerId })
            .populate({
                path: 'post',
                select: 'title content',
                populate: [
                    { path: 'vehicle', select: 'make model year price' }, 
                    { path: 'accessory', select: 'name description price' } 
                ]
            });
    } catch (error) {
        throw new Error(`Error retrieving all leads for dealer ${dealerId}: ${error.message}`);
    }
};
