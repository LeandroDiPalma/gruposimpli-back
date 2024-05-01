import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  dealer: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: [true, 'Cada post debe estar asociado a un concesionario']
  },
  title: {
    type: String,
    required: [true, 'El título del post es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder los 200 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido del post es obligatorio'],
    trim: true
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [false, 'El post puede estar asociado a un vehículo'],
  },
  accessory: {
    type: Schema.Types.ObjectId,
    ref: 'Accessory',
    required: [false, 'El post puede estar asociado a un accesorio'],
  }
}, { timestamps: true }); 

postSchema.index({ title: 'text', content: 'text' }); 

export default model('Post', postSchema);
