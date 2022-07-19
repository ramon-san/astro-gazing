import mongoose from 'mongoose';

const Schema = mongoose.Schema; // This is just a shortcut.

const campSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

// This is how we export in ESM.
export const Camp = mongoose.model('Camp', campSchema);