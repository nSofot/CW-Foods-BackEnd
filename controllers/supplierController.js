import Supplier from '../models/supplier.js';  
import { isAdmin } from "./userController.js";

export async function AddSupplier(req, res) {
    let supplierId = "0001";
    try {
        const lastSupplier = await Supplier.find().sort({ createdAt: -1 }).limit(1);
        if (lastSupplier.length > 0) {
            const lastId = parseInt(lastSupplier[0].supplierId.replace("000", ""));
            supplierId = String(lastId + 1).padStart(4, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last supplier", error: err.message });
    }
    req.body.supplierId = supplierId;
    const supplier = new Supplier(req.body);
    try {
        await supplier.save();
        res.json({ message: "Supplier added" });
    } catch (error) {
        console.error("Error saving supplier:", error);
        res.status(500).json({
            message: "Supplier not added",
            error: error.message,
        });
    }
}

export async function getSuppliers(req, res) {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch suppliers" });
    }
}

export async function getSupplierById(req, res) {
    const { supplierId } = req.params;
    try {
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch supplier" });
    }
}

export async function deleteSupplier(req, res) {
    const { supplierId } = req.params;    
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }    
        res.json({ message: "Supplier deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete supplier" });
    }
}

export async function updateSupplier(req, res) {    
    const { supplierId } = req.params;    
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, req.body, { new: true });
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }    
        res.json({ message: "Supplier updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update supplier" });
    }
}