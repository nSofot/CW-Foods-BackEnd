import CustomerTransaction from "../models/customerTransaction.js";

export async function AddCustomerTransaction(req, res) {
    const trxType = req.body.transactionType;
    if (trxType === "receipt" || trxType === "credit note" || trxType === "debit note") {
        const trxPrefixMap = {
            "receipt": "RCPT",
            "credit note": "CRED",
            "debit note": "DEBT",
        };

        if (!trxPrefixMap[trxType]) {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        const prefix = trxPrefixMap[trxType];
        let lastSeqNum = 0;

        // YYYYMMDD
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");

        try {
            const lastTransaction = await CustomerTransaction
                .find({ transactionId: { $regex: `^${prefix}-${datePart}-` } })
                .sort({ transactionId: -1 })
                .limit(1);

            if (lastTransaction.length > 0) {
                const lastRefId = lastTransaction[0].transactionId;
                lastSeqNum = parseInt(lastRefId.slice(-4), 10);
            }

            const nextSeq = String(lastSeqNum + 1).padStart(4, "0");
            req.body.transactionId = `${prefix}-${datePart}-${nextSeq}`;
        }
        catch (err) {
            return res.status(500).json({
                message: "Error generating transaction ID",
                error: err.message
            });
        }
    }
    const customerTransaction = new CustomerTransaction(req.body);
    await customerTransaction.save();

    res.status(200).json({
        message: "Customer transaction added successfully",
        transactionId: req.body.transactionId
    });
}

export async function GetCustomerTransactions(req, res) {
    const customerId = req.params.customerId;
    try {
        const transactions = await CustomerTransaction.find({ customerId: customerId });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({
            message: "Error getting customer transactions",
            error: err.message
        });
    }
}

export async function GetCustomerTransactionById(req, res) {
    const transactionId = req.params.transactionId;
    try {
        const transaction = await CustomerTransaction.findOne(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Customer transaction not found" });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({
            message: "Error getting customer transaction",
            error: err.message
        });
    }
}

export async function UpdateCustomerTransactionBalance(req, res) {
    const transactionId = req.params.transactionId;
    const newBalance = req.body.balance;
    try {
        const transaction = await CustomerTransaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Customer transaction not found" });
        }
        transaction.balance = newBalance;
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(500).json({
            message: "Error updating customer transaction balance",
            error: err.message
        });
    }
}

export async function CustomerOutstandingByCustomerId(req, res) {
  try {
    const { customerId } = req.params;

    const transactions = await CustomerTransaction.find({
      customerId,
      balance: { $gt: 0 }
    }).sort({ transactionDate: 1 });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch customer outstanding",
      error: err.message
    });
  }
}

export async function GetCustomerTransactionsByCustomerId(req, res) {
    const customerId = req.params.customerId;
    try {
        const transactions = await CustomerTransaction.find({ customerId: customerId });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({
            message: "Error getting customer transactions",
            error: err.message
        });
    }
}