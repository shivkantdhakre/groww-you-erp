import { useState } from "react";

function SalesReport() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [customer, setCustomer] = useState("");

    const salesData = [
        {
            invoiceNo: "SI-001",
            date: "2026-06-01",
            customer: "Rahul Sharma",
            amount: 5000,
            status: "Paid",
        },
        {
            invoiceNo: "SI-002",
            date: "2026-06-02",
            customer: "Amit Kumar",
            amount: 7000,
            status: "Pending",
        },
        {
            invoiceNo: "SI-003",
            date: "2026-06-03",
            customer: "Priya Enterprises",
            amount: 10000,
            status: "Paid",
        },
    ];

    const totalSales = salesData.reduce(
        (total, item) => total + item.amount,
        0
    );

    const totalInvoices = salesData.length;

    const averageInvoiceValue =
        totalInvoices > 0
            ? Math.round(totalSales / totalInvoices)
            : 0;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Sales Report
            </h1>

            {/* Filters */}

            <div className="bg-white p-5 rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

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
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">
                            Select Customer
                        </option>

                        <option>Rahul Sharma</option>
                        <option>Amit Kumar</option>
                        <option>Priya Enterprises</option>
                    </select>

                    <button className="bg-blue-600 text-white rounded-lg">
                        Search
                    </button>

                </div>
            </div>

            {/* Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Sales
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                        ₹ {totalSales}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Invoices
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                        {totalInvoices}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Average Invoice Value
                    </p>

                    <p className="text-2xl font-bold text-purple-600">
                        ₹ {averageInvoiceValue}
                    </p>
                </div>

            </div>

            {/* Table */}

            <div className="bg-white p-5 rounded-xl shadow mt-6">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Invoice No</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {salesData.map((sale, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">
                                    {sale.invoiceNo}
                                </td>

                                <td className="p-3">
                                    {sale.date}
                                </td>

                                <td className="p-3">
                                    {sale.customer}
                                </td>

                                <td className="p-3">
                                    ₹ {sale.amount}
                                </td>

                                <td className="p-3">
                                    {sale.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default SalesReport;