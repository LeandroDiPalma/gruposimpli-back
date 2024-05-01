import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dealerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del concesionario es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    location: {
        type: String,
        required: [true, 'La ubicación del concesionario es obligatoria'],
        trim: true,
        maxlength: [200, 'La ubicación no puede tener más de 200 caracteres']
    },
    vehicles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle'
        }
    ],
    accessories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    leads: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lead'
        }
    ]
}, { timestamps: true });


dealerSchema.index({ name: 1 });
dealerSchema.index({ location: 1 });


const Dealer = mongoose.models.Dealer || model('Dealer', dealerSchema);

export default Dealer;
