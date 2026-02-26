import StockTransaction from "../models/stockTransaction.js";


export async function saveStockTransaction(req, res) {
    const trxType = req.body.transactionType;
    const trxPrefixMap = {
    "grn": "GRN0",
    "invoice": "INVC",
    "transfer": "TRNF",
    "adjustment-in": "ADIN",
    "adjustment-out": "ADOT",
    "returns": "RETN",
    };
    const prefix = trxPrefixMap[trxType];

    if (!prefix) {
        return res.status(400).json({ message: "Invalid transaction type" });
    }
    let lastSeqNum = 0;
    // date part (YYYYMMDD)
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    try {
        const lastTransaction = await StockTransaction.find({ referenceId: { $regex: `^${prefix}-${datePart}-` } })
            .sort({ referenceId: -1 })
            .limit(1);        
        if (lastTransaction.length > 0) {
            const lastRefId = lastTransaction[0].referenceId;          
            lastSeqNum = parseInt(lastRefId.slice(-4), 10);                    
        }
    } catch (err) {
        return res.status(500).json({
        message: "Error generating transaction number",
        error: err.message
        });
    }    
    // example sequence number (replace with DB counter logic)
    const sequenceNumber = String(lastSeqNum + 1).padStart(4, "0");
    const transactionNumber = `${prefix}-${datePart}-${sequenceNumber}`;

    req.body.referenceId = transactionNumber;
    const stockTransactionData = req.body;
    try {
        const stockTransaction = new StockTransaction(stockTransactionData);
        await stockTransaction.save();
        res.json({ message: "Stock transaction saved successfully" });
    } catch (err) {
        res.status(500).json({
        message: "Error saving stock transaction",
        error: err.message
        });
    }
}

export async function getStockTransactions(req, res) {
    try {
        const stockTransactions = await StockTransaction.find();
        res.json(stockTransactions);
    } catch (err) {
        res.status(500).json({
            message: "Error getting stock transactions",
            error: err
        });
    }
}

export async function getStockTransactionById(req, res) {
    const transactionId = req.params.transactionId;
    try {
        const stockTransaction = await StockTransaction.findById(transactionId);
        if (!stockTransaction) {
            return res.status(404).json({ message: "Stock transaction not found" });
        }
        res.json(stockTransaction);
    } catch (err) {
        res.status(500).json({
            message: "Error getting stock transaction",
            error: err
        });
    }
}

export async function getStockTransactionsByProductId(req, res) {
    const productId = req.params.productId;
    try {
        const stockTransactions = await StockTransaction.find({ productId });
        res.json(stockTransactions);
    } catch (err) {
        res.status(500).json({
            message: "Error getting stock transactions",
            error: err
        });
    }
}

export async function getStockTransactionsByLocationId(req, res) {
    const locationId = req.params.locationId;
    try {
        const stockTransactions = await StockTransaction.find({ locationId });
        res.json(stockTransactions);
    } catch (err) {
        res.status(500).json({
            message: "Error getting stock transactions",
            error: err
        });
    }
}

export async function getStockTransactionsByProductIdAndLocationId(req, res) {
    const productId = req.params.productId;
    const locationId = req.params.locationId;
    try {
        const stockTransactions = await StockTransaction.find({ productId, locationId });
        res.json(stockTransactions);
    } catch (err) {
        res.status(500).json({
            message: "Error getting stock transactions",
            error: err
        });
    }
}