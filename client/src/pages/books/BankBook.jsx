import { useState } from "react";

function BankBook() {
    const [bankAccount, setBankAccount] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const bankEntries = [
        {
            date: "2026-06-01",
            voucherNo: "RV-001",
            particulars: "Customer Deposit",
            deposit: 10000,
            withdrawal: 0,
            balance: 10000,
        },
        {
            date: "2026-06-02",
            voucherNo: "PV-001",
            particulars: "Vendor Payment",
            deposit: 0,
            withdrawal: 3000,
            balance: 7000,
        },
        {
            date: "2026-06-02",
            voucherNo: "PV-001",
            particulars: "Vendor Payment",
            deposit: 0,
            withdrawal: 3000,
            balance: 7000,
        },
        {
            date: "2026-06-02",
            voucherNo: "PV-001",
            particulars: "Vendor Payment",
            deposit: 0,
            withdrawal: 3000,
            balance: 7000,
        },
        {
            date: "2026-06-02",
            voucherNo: "PV-001",
            particulars: "Vendor Payment",
            deposit: 0,
            withdrawal: 3000,
            balance: 7000,
        },
    ];

    const openingBalance = 50000;

    const totalDeposit = bankEntries.reduce(
        (total, item) => total + item.deposit,
        0
    );

    const totalWithdrawal = bankEntries.reduce(
        (total, item) => total + item.withdrawal,
        0
    );

    const closingBalance =
        openingBalance + totalDeposit - totalWithdrawal;

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Bank Book
            </h1>

            <p className="text-gray-500 mb-6">
                Track all bank transactions
            </p>

            {/* Filters */}

            <div className="bg-white p-5 rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    <select
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">
                            Select Bank Account
                        </option>

                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>SBI Bank</option>
                    </select>

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

                    <button className="bg-blue-600 text-white rounded-lg">
                        Search
                    </button>
                    <button
                        onClick={() => {
                            setBankAccount("");
                            setFromDate("");
                            setToDate("");
                        }}
                        className="bg-gray-500 text-white rounded-lg"
                    >
                        Reset
                    </button>

                </div>
            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Opening Balance
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                        ₹ {openingBalance}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Deposit
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                        ₹ {totalDeposit}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Withdrawal
                    </p>

                    <p className="text-2xl font-bold text-red-600">
                        ₹ {totalWithdrawal}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Closing Balance
                    </p>

                    <p className="text-2xl font-bold text-purple-600">
                        ₹ {closingBalance}
                    </p>
                </div>

            </div>

            <div className="flex gap-3 mt-6 mb-3">

                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    Export
                </button>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Print
                </button>

            </div>

            {/* Table */}

            <div className="bg-white p-5 rounded-xl shadow mt-6">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Voucher No</th>
                            <th className="p-3">Particulars</th>
                            <th className="p-3">Deposit</th>
                            <th className="p-3">Withdrawal</th>
                            <th className="p-3">Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bankEntries.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{item.date}</td>
                                <td className="p-3">{item.voucherNo}</td>
                                <td className="p-3">{item.particulars}</td>
                                <td className="p-3">₹ {item.deposit}</td>
                                <td className="p-3">₹ {item.withdrawal}</td>
                                <td className="p-3">₹ {item.balance}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default BankBook;