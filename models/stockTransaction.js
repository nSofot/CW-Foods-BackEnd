import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['grn', 'invoice', 'transfer-in', 'transfer-out', 'adjustment-in', 'adjustment-out', 'returns'],
    },
    transactionDate: {
        type: Date,
        required: true
    },
    locationId: {
        type: String,
        required: true
    },     
    supplierCustomerId: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    isAdded: {
        type: Boolean,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },           
            productName: {
                type: String,
                required: true
            },
            image: {
                type: String,
                default: ""
            },
            quantity: {
                type: Number,
                required: true
            },
            rate: {
                type: Number,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            brand: {
                type: String
            },
            uom: {
                type: String,
                required: true
            }            
        }      
    ], 
    createdAt: {
        type: Date,
        default: Date.now
    }    
});

const StockTransaction = mongoose.model("StockTransaction", stockTransactionSchema);

export default StockTransaction;