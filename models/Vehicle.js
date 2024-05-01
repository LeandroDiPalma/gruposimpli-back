import { Schema, model as _model } from 'mongoose';

const vehicleSchema = new Schema({
  dealer: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: [true, 'Cada vehículo debe estar asociado a un concesionario']
  },
  make: {
    type: String,
    required: [true, 'La marca del vehículo es obligatoria'],
    trim: true,
    maxlength: [50, 'La marca no puede exceder los 50 caracteres']
  },
  model: {
    type: String,
    required: [true, 'El modelo del vehículo es obligatorio'],
    trim: true,
    maxlength: [50, 'El modelo no puede exceder los 50 caracteres']
  },
  year: {
    type: Number,
    required: [true, 'El año del vehículo es obligatorio'],
    min: [1900, 'El año del vehículo debe ser posterior a 1900'],
    max: [new Date().getFullYear(), 'El año del vehículo no puede ser en el futuro']
  },
  price: {
    type: Number,
    required: [true, 'El precio del vehículo es obligatorio'],
    min: [0, 'El precio del vehículo no puede ser negativo']
  }
}, { timestamps: true }); 


vehicleSchema.index({ make: 1, model: 1 });

export default _model('Vehicle', vehicleSchema);
