import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,    
    },
    mongoose: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    dueBalance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;