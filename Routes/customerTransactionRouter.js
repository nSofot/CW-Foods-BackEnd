import express from "express";
import { AddCustomerTransaction } from "../controllers/customerTransactionController.js";
import { GetCustomerTransactions } from "../controllers/customerTransactionController.js";
import { GetCustomerTransactionById } from "../controllers/customerTransactionController.js";
import { UpdateCustomerTransactionBalance } from "../controllers/customerTransactionController.js";
import { CustomerOutstandingByCustomerId } from "../controllers/customerTransactionController.js";
import { GetCustomerTransactionsByCustomerId } from "../controllers/customerTransactionController.js";

const customerTransactionRouter = express.Router();

customerTransactionRouter.post("/", AddCustomerTransaction);
customerTransactionRouter.get("/", GetCustomerTransactions);
customerTransactionRouter.get("/:transactionId", GetCustomerTransactionById);
customerTransactionRouter.put("/:transactionId", UpdateCustomerTransactionBalance);
customerTransactionRouter.get("/pending/:customerId", CustomerOutstandingByCustomerId);
customerTransactionRouter.get("/customer/:customerId", GetCustomerTransactionsByCustomerId);

export default customerTransactionRouter;