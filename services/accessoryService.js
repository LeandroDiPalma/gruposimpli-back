import Accessory from '../models/accessory.js';
import Dealer from '../models/Dealer.js';

export const createAccessory = async (accessoryData) => {
    try {
        const accessory = new Accessory(accessoryData);
        await accessory.save();

        const dealer = await Dealer.findById(accessoryData.dealer);
        if (!dealer) {
            throw new Error('Dealer not found');
        }
        dealer.accessories.push(accessory._id);
        await dealer.save();

        console.log('Dealer updated with new Accesory:', dealer);
        return accessory;

    } catch (error) {
        throw new Error(`Error creating accessory: ${error.message}`);
    }
}
export const getAccessoryById = async (accessoryId) => {
    try {
        const accessory = await Accessory.findById(accessoryId);
        if (!accessory) {
            throw new Error('Accessory not found');
        }
        return accessory;
    } catch (error) {
        throw new Error(`Error retrieving accessory: ${error.message}`);
    }
};

export const updateAccessory = async (accessoryId, accessoryData) => {
    try {
        const accessory = await Accessory.findByIdAndUpdate(accessoryId, accessoryData, { new: true, runValidators: true });
        if (!accessory) {
            throw new Error('Accessory not found');
        }
        return accessory;
    } catch (error) {
        throw new Error(`Error updating accessory: ${error.message}`);
    }
};

export const deleteAccessory = async (accessoryId) => {
    try {
        const result = await Accessory.findByIdAndDelete(accessoryId);
        if (!result) {
            throw new Error('Accessory not found');
        }
        return { message: 'Accessory deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting accessory: ${error.message}`);
    }
};

export const getAllAccessoriesByDealer = async (dealerId) => {
    try {
        if (!dealerId) {
            throw new Error("Dealer ID must be provided.");
        }
        return await Accessory.find({ dealer: dealerId });
    } catch (error) {
        throw new Error(`Error retrieving all accessories for dealer ${dealerId}: ${error.message}`);
    }
};
