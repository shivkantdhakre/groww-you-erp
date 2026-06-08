import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import Inventory from "./pages/Inventory";

import SalesInvoice from "./pages/sales/SalesInvoice";
import SalesReturn from "./pages/sales/SalesReturn";

import PurchaseInvoice from "./pages/purchase/PurchaseInvoice";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";

import VendorLedger from "./pages/books/VendorLedger";

import SalesReport from "./pages/reports/SalesReport";
import PurchaseReport from "./pages/reports/PurchaseReport";
import ReportsDashboard from "./pages/ReportsDashboard";

import PaymentVoucher from "./pages/accounts/PaymentVoucher";
import ReceiptVoucher from "./pages/accounts/ReceiptVoucher";
import CashBook from "./pages/books/CashBook";
import BankBook from "./pages/books/BankBook";
import DayBook from "./pages/books/DayBook";
import JournalVoucher from "./pages/accounts/JournalVoucher";
import ContraVoucher from "./pages/accounts/ContraVoucher";

import StockReport from "./pages/reports/StockReport";
import OutstandingReport from "./pages/reports/OutstandingReport";
import CompanySettings from "./pages/settings/CompanySettings";
import UserManagement from "./pages/settings/UserManagement";
import RoleManagement from "./pages/settings/RoleManagement";
import BackupRestore from "./pages/settings/BackupRestore";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">

        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1">

          <Navbar />

          <div className="p-6">


            <Breadcrumb />

            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/customers" element={<Customers />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/inventory" element={<Inventory />} />

              <Route path="/sales-invoice" element={<SalesInvoice />} />
              <Route path="/sales-return" element={<SalesReturn />} />

              <Route path="/purchase-invoice" element={<PurchaseInvoice />} />
              <Route path="/purchase-return" element={<PurchaseReturn />} />

              <Route path="/payment-voucher" element={<PaymentVoucher />} />
              <Route path="/receipt-voucher" element={<ReceiptVoucher />} />

              <Route path="/reports-dashboard" element={<ReportsDashboard />} />
              <Route path="/sales-report" element={<SalesReport />} />
              <Route path="/purchase-report" element={<PurchaseReport />} />
              <Route path="/vendor-ledger" element={<VendorLedger />} />
              <Route
                path="/cash-book"
                element={<CashBook />}
              />
              <Route
                path="/bank-book"
                element={<BankBook />}
              />
              <Route
                path="/day-book"
                element={<DayBook />}
              />
              <Route
                path="/journal-voucher"
                element={<JournalVoucher />}
              />
              <Route
                path="/contra-voucher"
                element={<ContraVoucher />}
              />
              <Route
                path="/stock-report"
                element={<StockReport />}
              />
              <Route
                path="/outstanding-report"
                element={<OutstandingReport />}
              />
              <Route
                path="/company-settings"
                element={<CompanySettings />}
              />
              <Route
                path="/user-management"
                element={<UserManagement />}
              />
              <Route
                path="/role-management"
                element={<RoleManagement />}
              />
              <Route
                path="/backup-restore"
                element={<BackupRestore />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;