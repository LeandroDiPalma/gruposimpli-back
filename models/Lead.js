import { Schema, model } from 'mongoose';

const leadSchema = new Schema({
  dealer: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: [true, 'El lead debe estar asociado a un concesionario']
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'El lead debe estar asociado a una publicación']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido'] 
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [100, 'El apellido no puede exceder los 100 caracteres']
  },
  firstName: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
  }
}, { timestamps: true }); 

leadSchema.index({ email: 1, lastName: 1 });

export default model('Lead', leadSchema);
