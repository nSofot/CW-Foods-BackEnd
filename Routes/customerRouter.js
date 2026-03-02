import express from 'express';
import { 
    AddCustomer, 
    GetCustomers, 
    GetCustomerById, 
    UpdateCustomer, 
    DeleteCustomer,
    AddCustomerBalance,
    ReduceCustomerBalance
    } from '../controllers/customerController.js';

const router = express.Router();

router.post('/', AddCustomer);
router.get('/', GetCustomers);
router.get('/:customerId', GetCustomerById);
router.put('/:customerId', UpdateCustomer);
router.delete('/:customerId', DeleteCustomer);
router.post('/:customerId/addBalance', AddCustomerBalance);
router.post('/:customerId/reduceBalance', ReduceCustomerBalance);

export default router;
