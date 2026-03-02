import express from 'express';
import { AddSupplier } from '../controllers/supplierController.js';
import { getSuppliers } from '../controllers/supplierController.js';
import { getSupplierById } from '../controllers/supplierController.js';
import { deleteSupplier } from '../controllers/supplierController.js';
import { updateSupplier } from '../controllers/supplierController.js';

const supplierRouter = express.Router();

supplierRouter.post('/', AddSupplier);
supplierRouter.get('/', getSuppliers);
supplierRouter.get('/:supplierId', getSupplierById);
supplierRouter.delete('/:supplierId', deleteSupplier);
supplierRouter.put('/:supplierId', updateSupplier);

export default supplierRouter;