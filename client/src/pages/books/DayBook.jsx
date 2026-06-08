import { useState } from "react";

function DayBook() {
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const entries = [
        {
            date: "2026-06-06",
            voucherNo: "PV-001",
            type: "Payment Voucher",
            particulars: "Vendor Payment",
            debit: 2000,
            credit: 0,
        },
        {
            date: "2026-06-06",
            voucherNo: "RV-001",
            type: "Receipt Voucher",
            particulars: "Customer Receipt",
            debit: 0,
            credit: 5000,
        },
        {
            date: "2026-06-06",
            voucherNo: "SI-001",
            type: "Sales Invoice",
            particulars: "Sales Invoice",
            debit: 0,
            credit: 10000,
        },
    ];

    const totalEntries = entries.length;

    const totalDebit = entries.reduce(
        (total, item) => total + item.debit,
        0
    );

    const totalCredit = entries.reduce(
        (total, item) => total + item.credit,
        0
    );

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Day Book
            </h1>

            <p className="text-gray-500 mb-6">
                Show all daily transactions
            </p>

            {/* Filter */}

            <div className="bg-white p-5 rounded-xl shadow mb-6" Day>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <button className="bg-blue-600 text-white rounded-lg">
                        Search
                    </button>

                    <button
                        onClick={() =>
                            setDate(
                                new Date().toISOString().split("T")[0]
                            )
                        }
                        className="bg-gray-500 text-white rounded-lg"
                    >
                        Reset
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white p-5 rounded-xl shadow">
                        <p className="text-gray-500">Total Entries</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {totalEntries}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <p className="text-gray-500">Total Debit</p>
                        <p className="text-2xl font-bold text-red-600">
                            ₹ {totalDebit}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <p className="text-gray-500">Total Credit</p>
                        <p className="text-2xl font-bold text-green-600">
                            ₹ {totalCredit}
                        </p>
                    </div>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Entries
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                        {totalEntries}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Debit
                    </p>

                    <p className="text-2xl font-bold text-red-600">
                        ₹ {totalDebit}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Credit
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                        ₹ {totalCredit}
                    </p>
                </div>

            </div>

            <div className="flex gap-3 mb-3">

                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    Export
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Print
                </button>

            </div>



            {/* Table */}

            <div className="bg-white p-5 rounded-xl shadow">
                <table className="w-full">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Voucher No</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Particulars</th>
                            <th className="p-3">Debit</th>
                            <th className="p-3">Credit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {entries.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{item.date}</td>
                                <td className="p-3">{item.voucherNo}</td>
                                <td className="p-3">{item.type}</td>
                                <td className="p-3">{item.particulars}</td>
                                <td className="p-3">₹ {item.debit}</td>
                                <td className="p-3">₹ {item.credit}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div >
    );
}

export default DayBook;