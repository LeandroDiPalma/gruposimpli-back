import { Schema, model } from 'mongoose';

const accessorySchema = new Schema({
  dealer: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: [true, 'El accesorio debe estar asociado a un concesionario']
  },
  name: {
    type: String,
    required: [true, 'El nombre del accesorio es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre del accesorio no puede exceder los 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio del accesorio es obligatorio'],
    min: [0, 'El precio no puede ser menor a 0']
  }
}, { timestamps: true }); 

accessorySchema.index({ name: 1 });

export default model('Accessory', accessorySchema);
