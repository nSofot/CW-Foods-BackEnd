import express from 'express';
import {
  saveStockTransaction,
  getStockTransactions,
  getStockTransactionById,
  getStockTransactionsByProductId,
  getStockTransactionsByLocationId,
  getStockTransactionsByProductIdAndLocationId
} from '../controllers/stockTransactionController.js';

const stockTransactionRouter = express.Router();

// POST
stockTransactionRouter.post('/', saveStockTransaction);

// GET routes — specific → general
stockTransactionRouter.get('/product/:productId/location/:locationId', getStockTransactionsByProductIdAndLocationId);
stockTransactionRouter.get('/product/:productId', getStockTransactionsByProductId);
stockTransactionRouter.get('/location/:locationId', getStockTransactionsByLocationId);
stockTransactionRouter.get('/', getStockTransactions);
stockTransactionRouter.get('/:transactionId', getStockTransactionById);

export default stockTransactionRouter;
