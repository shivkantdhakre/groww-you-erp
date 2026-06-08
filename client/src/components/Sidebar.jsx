import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar() {
    const [masters, setMasters] = useState(false);
    const [sales, setSales] = useState(false);
    const [purchase, setPurchase] = useState(false);
    const [accounts, setAccounts] = useState(false);
    const [books, setBooks] = useState(false);
    const [reports, setReports] = useState(false);
    const [settings, setSettings] = useState(false);

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen p-4 overflow-y-auto">

            <h1 className="text-2xl font-bold mb-8">
                Groww You ERP
            </h1>

            {/* Dashboard */}
            <Link
                to="/"
                className="block p-3 rounded hover:bg-slate-700"
            >
                Dashboard
            </Link>

            {/* Masters */}
            <button
                onClick={() => setMasters(!masters)}
                className="w-full text-left p-3 mt-2 hover:bg-slate-700 rounded"
            >
                Masters ▼
            </button>

            {masters && (
                <div className="ml-4">
                    <Link to="/customers" className="block p-2 hover:text-blue-400">
                        Customer Master
                    </Link>

                    <Link to="/vendors" className="block p-2 hover:text-blue-400">
                        Vendor Master
                    </Link>

                    <Link to="/inventory" className="block p-2 hover:text-blue-400">
                        Item Master
                    </Link>
                </div>
            )}

            {/* Sales */}
            <button
                onClick={() => setSales(!sales)}
                className="w-full text-left p-3 hover:bg-slate-700 rounded"
            >
                Sales ▼
            </button>

            {sales && (
                <div className="ml-4">
                    <Link to="/sales-invoice" className="block p-2 hover:text-blue-400">
                        Sales Invoice
                    </Link>

                    <Link to="/sales-return" className="block p-2 hover:text-blue-400">
                        Sales Return
                    </Link>
                </div>
            )}

            {/* Purchase */}
            <button
                onClick={() => setPurchase(!purchase)}
                className="w-full text-left p-3 hover:bg-slate-700 rounded"
            >
                Purchase ▼
            </button>

            {purchase && (
                <div className="ml-4">
                    <Link to="/purchase-invoice" className="block p-2 hover:text-blue-400">
                        Purchase Invoice
                    </Link>

                    <Link to="/purchase-return" className="block p-2 hover:text-blue-400">
                        Purchase Return
                    </Link>
                </div>
            )}

            {/* Accounts */}
            <button
                onClick={() => setAccounts(!accounts)}
                className="w-full text-left p-3 hover:bg-slate-700 rounded"
            >
                Accounts ▼
            </button>

            {accounts && (
                <div className="ml-4">
                    <Link to="/payment-voucher" className="block p-2 hover:text-blue-400">
                        Payment Voucher
                    </Link>

                    <Link to="/receipt-voucher" className="block p-2 hover:text-blue-400">
                        Receipt Voucher
                    </Link>

                    <Link to="/journal-voucher" className="block p-2 hover:text-blue-400">
                        Journal Voucher
                    </Link>

                    <Link to="/contra-voucher" className="block p-2 hover:text-blue-400">
                        Contra Voucher
                    </Link>
                </div>
            )}

            {/* Books */}
            <button
                onClick={() => setBooks(!books)}
                className="w-full text-left p-3 hover:bg-slate-700 rounded"
            >
                Books ▼
            </button>

            {books && (
                <div className="ml-4">
                    <Link to="/vendor-ledger" className="block p-2 hover:text-blue-400">
                        Vendor Ledger
                    </Link>

                    <Link to="/cash-book" className="block p-2 hover:text-blue-400">
                        Cash Book
                    </Link>

                    <Link to="/bank-book" className="block p-2 hover:text-blue-400">
                        Bank Book
                    </Link>

                    <Link to="/day-book" className="block p-2 hover:text-blue-400">
                        Day Book
                    </Link>
                </div>
            )}

            {/* Reports */}
            <button
                onClick={() => setReports(!reports)}
                className="w-full text-left p-3 hover:bg-slate-700 rounded"
            >
                Reports ▼
            </button>

            {reports && (
                <div className="ml-4">
                    <Link to="/reports-dashboard" className="block p-2 hover:text-blue-400">
                        Reports Dashboard
                    </Link>

                    <Link to="/sales-report" className="block p-2 hover:text-blue-400">
                        Sales Report
                    </Link>

                    <Link to="/purchase-report" className="block p-2 hover:text-blue-400">
                        Purchase Report
                    </Link>
                    <Link to="/stock-report" className="block p-2 hover:text-blue-400">
                        Stock Report
                    </Link>
                    <Link to="/outstanding-report" className="block p-2 hover:text-blue-400">
                        Outstanding Report
                    </Link>
                </div>
            )}

            {/* Settings */}
            <button
                onClick={() => setSettings(!settings)}
                className="w-full text-left p-3 hover:bg-slate-700 rounded"
            >
                Settings ▼
            </button>
            {settings && (
                <div className="ml-4">
                    <Link to="/company-settings" className="block p-2 hover:text-blue-400">
                        Company Settings
                    </Link>
                    <Link
                        to="/user-management"
                        className="block p-2 hover:text-blue-400"
                    >
                        User Management
                    </Link>
                    <Link
                        to="/backup-restore"
                        className="block p-2 hover:text-blue-400"
                    >
                        Backup & Restore
                    </Link>
                    <Link
                        to="/role-management"
                        className="block p-2 hover:text-blue-400"
                    >
                        Role Management
                    </Link>
                </div>
            )}

        </div>
    );
}

export default Sidebar;