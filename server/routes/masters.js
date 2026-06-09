import express from 'express';
import { 
  getCustomers, createCustomer,
  getVendors, createVendor,
  getItems, createItem 
} from '../controllers/mastersController.js';
import { verifyTokenAndTenant } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the security middleware to ALL routes in this file
router.use(verifyTokenAndTenant);

// Customers
router.get('/customers', getCustomers);
router.post('/customers', createCustomer);

// Vendors
router.get('/vendors', getVendors);
router.post('/vendors', createVendor);

// Items (Inventory)
router.get('/items', getItems);
router.post('/items', createItem);

export default router;

