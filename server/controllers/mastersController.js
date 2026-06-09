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
