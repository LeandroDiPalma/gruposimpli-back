import Dealer from '../models/Dealer.js';
import Vehicle from '../models/vehicle.js';

const handleError = (error) => {
  if (error.name === 'ValidationError') {
    return new Error(`Validation error: ${error.message}`);
  }
  return new Error(`Internal Server Error: ${error.message}`);
}

export const createVehicle = async (vehicleData) => {
  if (!vehicleData) throw new Error('Vehicle data must be provided');
  try {
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    const dealer = await Dealer.findById(vehicleData.dealer);
    if (!dealer) {
      throw new Error('Dealer not found');
    }
    dealer.vehicles.push(vehicle._id);
    await dealer.save();

    console.log('Dealer updated with new vehicle:', dealer);
    return vehicle;
  } catch (error) {
    throw handleError(error);
  }
}

export const getVehicleById = async (vehicleId) => {
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    console.log(Vehicle)
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  } catch (error) {
    console.log(error)
    throw handleError(error);
  }
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, vehicleData, { new: true, runValidators: true });
    if (!updatedVehicle) {
      throw new Error('Vehicle not found');
    }

    return updatedVehicle;
  } catch (error) {
    throw handleError(error);
  }
};


export const deleteVehicle = async (vehicleId) => {
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    await Vehicle.findByIdAndDelete(vehicleId);

    if (vehicle.dealer) {
      await Dealer.findByIdAndUpdate(vehicle.dealer, {
        $pull: { vehicles: vehicle._id }
      });
    }

    return { message: 'Vehicle deleted successfully' };
  } catch (error) {
    throw handleError(error);
  }
};

export const getAllVehiclesByDealer = async (dealerId) => {
  try {
    if (!dealerId) {
      throw new Error("Dealer ID must be provided to fetch vehicles.");
    }
    return await Vehicle.find({ dealer: dealerId });
  } catch (error) {
    throw new Error(`Error retrieving all vehicles for dealer ${dealerId}: ${error.message}`);
  }
};