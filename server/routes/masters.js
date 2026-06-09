import express from 'express';
import { getCustomers, createCustomer } from '../controllers/mastersController.js';
import { verifyTokenAndTenant } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the security middleware to ALL routes in this file
router.use(verifyTokenAndTenant);

// Mock data structures to align with frontend components (compatibility)
let vendors = [
  { id: 1, name: "ABC Traders", mobile: "9876543211", gst: "09ABCDE1234F2Z", address: "Mumbai", openingBalance: "5000" }
];

let items = [
  { id: 1, itemName: "Laptop", itemCode: "LAP001", category: "Electronics", hsnCode: "8471", gst: "18", unit: "Pcs", purchaseRate: "40000", saleRate: "45000", openingStock: "15" }
];

// --- CUSTOMERS ROUTES ---
router.get('/customers', getCustomers);
router.post('/customers', createCustomer);

// --- VENDORS ROUTES ---
router.get("/vendors", (req, res) => {
  res.status(200).json(vendors);
});

router.post("/vendors", (req, res) => {
  const { name, mobile, gst, address, openingBalance } = req.body;
  if (!name || !mobile) {
    return res.status(400).json({ message: "Vendor Name and Mobile are required" });
  }
  const newVendor = {
    id: vendors.length + 1,
    name,
    mobile,
    gst,
    address,
    openingBalance
  };
  vendors.push(newVendor);
  res.status(201).json(newVendor);
});

// --- INVENTORY / ITEMS ROUTES ---
router.get("/items", (req, res) => {
  res.status(200).json(items);
});

router.post("/items", (req, res) => {
  const { itemName, itemCode, category, hsnCode, gst, unit, purchaseRate, saleRate, openingStock } = req.body;
  if (!itemName || !itemCode) {
    return res.status(400).json({ message: "Item Name and Item Code are required" });
  }
  const newItem = {
    id: items.length + 1,
    itemName,
    itemCode,
    category,
    hsnCode,
    gst,
    unit,
    purchaseRate,
    saleRate,
    openingStock
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

export default router;
