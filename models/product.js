import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        type: String,
        required: true
    },
    brandId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    altName: [
        {type: String}
    ],
    description: {
        type: String,
    },
    image: [
        {type: String},
    ],
    labelledPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    retailPrice: {
        type: Number,
        required: true
    },
    distributorPrice: {
        type: Number,
        required: true
    },
    discountRate: {
        type: Number,
        default: 0
    },
    averageCost: {
        type: Number,
        default: 0
    },
    uomId: {
        type: String,
        required: true  
    },
    stock: [
        {
            locationId: { type: String, required: true },
            quantity: { type: Number, required: true, default: 0 }
    }],
    isAvailable: {
        type: Boolean,
        default: true 
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;