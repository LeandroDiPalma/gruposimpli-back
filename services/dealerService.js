import Dealer from '../models/dealer.js';

export const createDealer = async (dealerData) => {
    try {
        const dealer = new Dealer(dealerData);
        await dealer.save();
        return dealer;
    } catch (error) {
        throw new Error(`Error creating dealer: ${error.message}`);
    }
}

export const getDealerById = async (dealerId) => {
    try {
        const dealer = await Dealer.findById(dealerId);
        if (!dealer) {
            throw new Error('Dealer not found');
        }
        return dealer;
    } catch (error) {
        throw new Error(`Error retrieving dealer: ${error.message}`);
    }
};


export const updateDealer = async (dealerId, dealerData) => {
    try {
        const dealer = await Dealer.findByIdAndUpdate(dealerId, dealerData, { new: true, runValidators: true });
        if (!dealer) {
            throw new Error('Dealer not found');
        }
        return dealer;
    } catch (error) {
        throw new Error(`Error updating dealer: ${error.message}`);
    }
};


export const deleteDealer = async (dealerId) => {
    try {
        const result = await Dealer.findByIdAndDelete(dealerId);
        if (!result) {
            throw new Error('Dealer not found');
        }
        return { message: 'Dealer deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting dealer: ${error.message}`);
    }
};

export const getAllDealers = async () => {
    try {
        console.log(Dealer)
        return await Dealer.find({});
    } catch (error) {
        throw new Error(`Error retrieving all dealers: ${error.message}`);
    }
};