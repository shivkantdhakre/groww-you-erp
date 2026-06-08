import { useState } from "react";
function PurchaseReport() {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [vendor, setVendor] = useState("");
    const purchaseData = [
        {
            invoice: "PUR-001",
            date: "2026-06-01",
            vendor: "ABC Traders",
            amount: 12000,
            status: "Paid",
        },
        {
            invoice: "PUR-002",
            date: "2026-06-02",
            vendor: "XYZ Suppliers",
            amount: 18000,
            status: "Pending",
        },
        {
            invoice: "PUR-003",
            date: "2026-06-03",
            vendor: "ABC Traders",
            amount: 15000,
            status: "Paid",
        },
        {
            invoice: "PUR-004",
            date: "2026-06-04",
            vendor: "XYZ Suppliers",
            amount: 22000,
            status: "Pending",
        },
        {
            invoice: "PUR-005",
            date: "2026-06-05",
            vendor: "ABC Traders",
            amount: 17000,
            status: "Paid",
        },
    ];
    const totalPurchase = purchaseData.reduce(
        (total, item) => total + item.amount,
        0
    );

    const totalInvoices = purchaseData.length;

    const averagePurchase =
        totalPurchase / totalInvoices;

    return (
        <div>
            <>
                <h1 className="text-3xl font-bold">
                    Purchase Report
                </h1>

                <p className="text-gray-500 mb-6">
                    Track all purchase transactions
                </p>
            </>


            <div className="bg-white p-5 rounded-xl shadow mb-6">

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">
                            Select Vendor
                        </option>

                        <option>ABC Traders</option>
                        <option>XYZ Suppliers</option>
                    </select>

                    <button className="bg-blue-600 text-white rounded-lg">
                        Search
                    </button>

                    <button
                        className="bg-gray-500 text-white rounded-lg"
                        onClick={() => {
                            setFromDate("");
                            setToDate("");
                            setVendor("");
                        }}
                    >
                        Reset
                    </button>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Total Purchase</p>
                    <p className="text-2xl font-bold text-blue-600">
                        ₹ {totalPurchase}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Total Purchase Invoices</p>
                    <p className="text-2xl font-bold text-green-600">
                        {totalInvoices}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Average Purchase Value</p>
                    <p className="text-2xl font-bold text-purple-600">
                        ₹ {averagePurchase}
                    </p>
                </div>

            </div>


            <div className="bg-white p-5 rounded-xl shadow">
                <table className="w-full">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-3">Invoice No</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Vendor</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchaseData.map((purchase, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{purchase.invoice}</td>
                                <td className="p-3">{purchase.date}</td>
                                <td className="p-3">{purchase.vendor}</td>
                                <td className="p-3">₹ {purchase.amount}</td>
                                <td className="p-3">{purchase.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PurchaseReport;