import mongoose from 'mongoose';

const Schema = mongoose.Schema; // This is just a shortcut.

// The customer is another business.
const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
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
    image: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
});

// This is how we export in ESM.
export const Customer = mongoose.model('Customer', customerSchema);