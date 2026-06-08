import express from "express";

const router = express.Router();

// Mock reports data matching the structures in the React reporting pages
const salesReportData = [
  { id: 1, invoiceNo: "INV-001", date: "2026-06-01", customerName: "Amit Traders", amount: 15000, status: "Paid" },
  { id: 2, invoiceNo: "INV-002", date: "2026-06-02", customerName: "Sharma Enterprises", amount: 25000, status: "Pending" }
];

const purchaseReportData = [
  { id: 1, invoiceNo: "PUR-001", date: "2026-06-01", vendorName: "ABC Suppliers", amount: 12000, status: "Paid" },
  { id: 2, invoiceNo: "PUR-002", date: "2026-06-03", vendorName: "XYZ Traders", amount: 18000, status: "Pending" }
];

const stockReportData = [
  { id: 1, itemName: "Laptop", itemCode: "LAP001", openingStock: 15, stockIn: 10, stockOut: 5, closingStock: 20 },
  { id: 2, itemName: "Mouse", itemCode: "MOU001", openingStock: 50, stockIn: 20, stockOut: 30, closingStock: 40 }
];

const outstandingReportData = [
  { id: 1, partyName: "Amit Traders", partyType: "Customer", mobile: "9876543210", outstanding: 25000 },
  { id: 2, partyName: "XYZ Traders", partyType: "Vendor", mobile: "9876543212", outstanding: 17000 }
];

// --- REPORTS ENDPOINTS ---

router.get("/sales", (req, res) => {
  res.status(200).json(salesReportData);
});

router.get("/purchase", (req, res) => {
  res.status(200).json(purchaseReportData);
});

router.get("/stock", (req, res) => {
  res.status(200).json(stockReportData);
});

router.get("/outstanding", (req, res) => {
  res.status(200).json(outstandingReportData);
});

router.get("/summary", (req, res) => {
  // Overall dashboard stats summary
  res.status(200).json({
    totalSales: 40000,
    totalPurchases: 30000,
    totalProfit: 10000,
    activeCustomersCount: 2,
    activeVendorsCount: 2,
    lowStockItemsCount: 1
  });
});

export default router;
