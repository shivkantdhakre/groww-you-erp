import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CUSTOMER CONTROLLERS
// ==========================================

// Fetch all customers for the logged-in user's company
export const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: { companyId: req.user.companyId },
      orderBy: { name: 'asc' } // Alphabetical order for the frontend
    });
    
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

// Create a new customer safely tied to the company
export const createCustomer = async (req, res) => {
  try {
    const { name, mobile, address, gstin, openingBalance, creditLimit } = req.body;
    
    const newCustomer = await prisma.customer.create({
      data: {
        companyId: req.user.companyId, // SECURE: Injected by middleware, not the frontend
        name,
        mobile,
        address,
        gstin,
        openingBalance: parseFloat(openingBalance) || 0.0,
        creditLimit: parseFloat(creditLimit) || 0.0
      }
    });
    
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Failed to create customer' });
  }
};

// ==========================================
// VENDOR CONTROLLERS
// ==========================================

export const getVendors = async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      where: { companyId: req.user.companyId },
      orderBy: { name: 'asc' }
    });
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Failed to fetch vendors' });
  }
};

export const createVendor = async (req, res) => {
  try {
    const { name, mobile, address, gstin, openingBalance } = req.body;
    const newVendor = await prisma.vendor.create({
      data: {
        companyId: req.user.companyId,
        name,
        mobile,
        address,
        gstin,
        openingBalance: parseFloat(openingBalance) || 0.0
      }
    });
    res.status(201).json(newVendor);
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ message: 'Failed to create vendor' });
  }
};

// ==========================================
// ITEM (INVENTORY) CONTROLLERS
// ==========================================

export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { companyId: req.user.companyId },
      orderBy: { name: 'asc' }
    });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name, sku, category, unit, purchasePrice, salePrice, gstPercentage, openingStock, minStockAlert } = req.body;
    const newItem = await prisma.item.create({
      data: {
        companyId: req.user.companyId,
        name,
        sku,
        category,
        unit,
        purchasePrice: parseFloat(purchasePrice) || 0.0,
        salePrice: parseFloat(salePrice) || 0.0,
        gstPercentage: parseFloat(gstPercentage) || 0.0,
        openingStock: parseInt(openingStock) || 0,
        minStockAlert: parseInt(minStockAlert) || 0
      }
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Failed to create item' });
  }
};

