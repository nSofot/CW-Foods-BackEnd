import mongoose from "mongoose";
const customerTransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['invoice', 'receipt', 'credit note', 'debit note', 'returns'],
    },
    transactionDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    customerId: {
        type: String,
        required: true   
    },
    amount: {
        type: Number,
        required: true
    },
    isCredit: {
        type: Boolean,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CustomerTransaction = mongoose.model("CustomerTransaction", customerTransactionSchema);

export default CustomerTransaction;