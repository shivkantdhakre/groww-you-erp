import express from "express";

const router = express.Router();

// Mock data structures
let salesInvoices = [];
let purchaseInvoices = [];
let salesReturns = [];
let purchaseReturns = [];
let vouchers = []; // Contra, Journal, Payment, Receipt

// --- SALES INVOICES ---
router.get("/sales-invoices", (req, res) => {
  res.status(200).json(salesInvoices);
});

router.post("/sales-invoices", (req, res) => {
  const { invoiceNo, invoiceDate, customerName, items, totalItems, totalQty, grandTotal } = req.body;
  if (!invoiceDate || !customerName || !items || items.length === 0) {
    return res.status(400).json({ message: "Invoice Date, Customer Name and at least one item are required" });
  }
  const newInvoice = {
    id: salesInvoices.length + 1,
    invoiceNo: invoiceNo || `INV-${String(salesInvoices.length + 1).padStart(3, "0")}`,
    invoiceDate,
    customerName,
    items,
    totalItems,
    totalQty,
    grandTotal
  };
  salesInvoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// --- PURCHASE INVOICES ---
router.get("/purchase-invoices", (req, res) => {
  res.status(200).json(purchaseInvoices);
});

router.post("/purchase-invoices", (req, res) => {
  const { invoiceNo, invoiceDate, vendorName, items, totalItems, totalQty, grandTotal } = req.body;
  if (!invoiceDate || !vendorName || !items || items.length === 0) {
    return res.status(400).json({ message: "Invoice Date, Vendor Name and at least one item are required" });
  }
  const newInvoice = {
    id: purchaseInvoices.length + 1,
    invoiceNo: invoiceNo || `PUR-${String(purchaseInvoices.length + 1).padStart(3, "0")}`,
    invoiceDate,
    vendorName,
    items,
    totalItems,
    totalQty,
    grandTotal
  };
  purchaseInvoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// --- RETURNS ---
router.get("/sales-returns", (req, res) => {
  res.status(200).json(salesReturns);
});

router.post("/sales-returns", (req, res) => {
  const { returnNo, date, customerName, items, grandTotal } = req.body;
  const newReturn = {
    id: salesReturns.length + 1,
    returnNo: returnNo || `SRT-${String(salesReturns.length + 1).padStart(3, "0")}`,
    date,
    customerName,
    items,
    grandTotal
  };
  salesReturns.push(newReturn);
  res.status(201).json(newReturn);
});

router.get("/purchase-returns", (req, res) => {
  res.status(200).json(purchaseReturns);
});

router.post("/purchase-returns", (req, res) => {
  const { returnNo, date, vendorName, items, grandTotal } = req.body;
  const newReturn = {
    id: purchaseReturns.length + 1,
    returnNo: returnNo || `PRT-${String(purchaseReturns.length + 1).padStart(3, "0")}`,
    date,
    vendorName,
    items,
    grandTotal
  };
  purchaseReturns.push(newReturn);
  res.status(201).json(newReturn);
});

// --- VOUCHERS (Contra, Journal, Payment, Receipt) ---
router.get("/vouchers", (req, res) => {
  const { type } = req.query; // Filter by type if provided
  if (type) {
    const filtered = vouchers.filter(v => v.type.toLowerCase() === type.toLowerCase());
    return res.status(200).json(filtered);
  }
  res.status(200).json(vouchers);
});

router.post("/vouchers", (req, res) => {
  const { voucherNo, date, type, debitAccount, creditAccount, amount, narration } = req.body;
  if (!type || !debitAccount || !creditAccount || !amount) {
    return res.status(400).json({ message: "Voucher Type, Debit/Credit Accounts and Amount are required" });
  }
  const newVoucher = {
    id: vouchers.length + 1,
    voucherNo: voucherNo || `VCH-${String(vouchers.length + 1).padStart(3, "0")}`,
    date: date || new Date().toISOString().split("T")[0],
    type, // Contra, Journal, Payment, Receipt
    debitAccount,
    creditAccount,
    amount,
    narration
  };
  vouchers.push(newVoucher);
  res.status(201).json(newVoucher);
});

export default router;
