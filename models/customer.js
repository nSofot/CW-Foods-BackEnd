import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    mobile: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: [{
        type: String,
    }],
    discount: {
        type: Number,
        default: 0
    },
    route: {
        type: String,
    },
    creditLimit: {
        type: Number,
        default: 0
    },
    creditPeriod: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;    