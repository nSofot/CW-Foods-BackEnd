import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req,res) {
    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)
        }
        else{
            const products = await Product.find({isAvailable : true})
            res.json(products)
        }

    }
    catch(err){
        res.status(500).json({
            message : "Error getting products",
            error: err
        })
    }
}

export async function getProductById(req, res) {
    const productId = req.params.productId

    try{
        const product = await Product.findOne({productId : productId})
        if (product == null) {
            res.status(404).json({
                message : "Product not found"
            })
            return
        }

        if(product.isAvailable){
            res.json(product)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Product not found"
            })
            return
            }
            else{
                res.json(product)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting product",
            error: err
        })
    }
}

export async function saveProduct(req, res) {

    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to add products"
        })
        return
    } 

    const { categoryId, brandId } = req.body;
    const key = `${categoryId}-${brandId}`;
    let productId = "";

    try {
        const lastProduct = await Product.find({ categoryId, brandId })
            .sort({ productId: -1 })
            .limit(1);

        if (lastProduct.length > 0) {
            const lastId = parseInt(
                lastProduct[0].productId.replace(`${key}-`, "")
            );
            productId = `${key}-${String(lastId + 1).padStart(3, "0")}`;
        } else {
            // First product for this category + brand
            productId = `${key}-001`;
        }
    } catch (err) {
        return res.status(500).json({ 
            message: "Failed to fetch last Product ID", 
            error: err.message 
        });
    }

    req.body.productId = productId; 
    const product = new Product(req.body);

    (
        req.body
    );

    product
        .save()
        .then(() => {
            res.json({
                message: "Product added"
            });
        })
        .catch(() => {
            res.json({
                message: "Product not added"  
            });
    })
}   

export async function deleteProduct(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete products"
        })
        return
    } 

    try{
        await Product.deleteOne({productId : req.params.productId})

        res.json({
            message : "Product deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete product",
            error: err
        })
    }
}

export async function updateProduct(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to update products"
        })
        return
    }
    const productId = req.params.productId
    const updatingData = req.body
    try{
        await Product.updateOne({productId : productId}, updatingData)

        res.json({    
            message : "Product updated successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to update product",
            error: err
        })
    }
}

export async function searchProducts(req, res) {
	const searchQuery = req.query.query || "";

	try {
		const regex = { $regex: searchQuery, $options: "i" };

		const filter = {
			isAvailable: true,
			...(searchQuery.trim() !== "" && {
				$or: [
					{ name: regex },
					{ altName: { $elemMatch: regex } }
				]
			})
		};

		const products = await Product.find(filter);
		res.json(products);
	} catch (err) {
		res.status(500).json({
			message: "Error searching products",
			error: err
		});
	}
}

export async function addStock(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "You are not authorized to update stock" });
    }

    const { productId } = req.params;
    const { locationId, quantity } = req.body;

    try {
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const qty = parseFloat(quantity);
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        // Check if this location stock already exists
        const stockItem = product.stock.find(s => s.locationId === locationId);
        if (stockItem) {
            stockItem.quantity += qty;  // update existing
        } else {
            product.stock.push({ locationId, quantity: qty }); // must push object, not number
        }

        await product.save();
        res.json({ message: "Stock updated successfully", stock: product.stock });
    } catch (err) {
        console.error("Add stock error:", err);
        res.status(500).json({ message: "Error updating stock", error: err.message });
    }
}


export async function reduceStock(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to update stock"
        })
        return
    }
    const { productId, locationId, quantity } = req.body;
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
