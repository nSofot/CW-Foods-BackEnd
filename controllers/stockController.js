import Stock from '../models/stocks.js';
import { isAdmin } from './userController.js';

export async function AddStock(req, res) {
    const { productId, locationId, quantity } = req.body;
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "You are not authorized to add stock" });
    }
    try {
        const existingStock = await Stock.findOne({ productId, locationId });
        if (existingStock) {
            existingStock.quantity += quantity;
            existingStock.updatedAt = Date.now();
            await existingStock.save();
        } else {
            const newStock = new Stock({ productId, locationId, quantity });
            await newStock.save();
        }
        res.json({ message: "Stock added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding stock", error: err.message });
    }
}

export async function SubtractStock(req, res) {
    const { productId, locationId, quantity } = req.body;
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "You are not authorized to subtract stock" });
    }
    try {
        const existingStock = await Stock.findOne({ productId, locationId });
        if (existingStock && existingStock.quantity >= quantity) {
            existingStock.quantity -= quantity;
            await existingStock.save();
        } else {
            return res.status(400).json({ message: "Insufficient stock" });
        }
        res.json({ message: "Stock subtracted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error subtracting stock", error: err.message });
    }
}

export async function getStock(req, res) {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: "Error getting stock", error: err.message });
    }
}

export async function getStockByProductId(req, res) {
    const productId = req.params.productId;
    try {
        const stocks = await Stock.find({ productId });
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: "Error getting stock", error: err.message });
    }
}

export async function getStockByLocationId(req, res) {
    const locationId = req.params.locationId;
    try {
        const stocks = await Stock.find({ locationId });
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: "Error getting stock", error: err.message });
    }
}

export async function getStockByProductAndLocation(req, res) {
    const { productId, locationId } = req.params;
    try {
        const stocks = await Stock.find({ productId, locationId });
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: "Error getting stock", error: err.message });
    }
}