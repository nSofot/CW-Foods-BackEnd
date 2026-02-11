import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  locationId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
