import express from 'express';

import { AddStock } from '../controllers/stockController.js';
import { SubtractStock } from '../controllers/stockController.js';
import { getStock } from '../controllers/stockController.js';
import { getStockByProductId } from '../controllers/stockController.js';
import { getStockByProductAndLocation } from '../controllers/stockController.js';
import { getStockByLocationId } from '../controllers/stockController.js';

const stockRouter = express.Router();

stockRouter.post("/add/:productId/:locationId/:quantity", AddStock);
stockRouter.post("/subtract/:productId/:locationId/:quantity", SubtractStock);
stockRouter.get("/", getStock);
stockRouter.get("/product/:productId", getStockByProductId);
stockRouter.get("/product/:productId/location/:locationId", getStockByProductAndLocation);
stockRouter.get("/location/:locationId", getStockByLocationId);

export default stockRouter;