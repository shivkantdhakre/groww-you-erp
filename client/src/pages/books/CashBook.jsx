import { useState } from "react";

function CashBook() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const cashEntries = [
    {
      date: "2026-06-01",
      voucherNo: "RV-001",
      particulars: "Customer Receipt",
      receipt: 5000,
      payment: 0,
      balance: 5000,
    },
    {
      date: "2026-06-02",
      voucherNo: "PV-001",
      particulars: "Vendor Payment",
      receipt: 0,
      payment: 2000,
      balance: 3000,
    },
    {
      date: "2026-06-03",
      voucherNo: "PV-001",
      particulars: "Vendor Payment",
      receipt: 0,
      payment: 2000,
      balance: 3000,
    },
    {
      date: "2026-06-02",
      voucherNo: "PV-001",
      particulars: "Vendor Payment",
      receipt: 0,
      payment: 2000,
      balance: 3000,
    },
    {
      date: "2026-06-02",
      voucherNo: "PV-001",
      particulars: "Vendor Payment",
      receipt: 0,
      payment: 2000,
      balance: 3000,
    },
  ];

  const openingCash = 10000;

  const totalReceipt = cashEntries.reduce(
    (total, item) => total + item.receipt,
    0
  );

  const totalPayment = cashEntries.reduce(
    (total, item) => total + item.payment,
    0
  );

  const closingCash =
    openingCash + totalReceipt - totalPayment;

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Cash Book
      </h1>

      <p className="text-gray-500 mb-6">
        Track all cash transactions
      </p>
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

          <button className="bg-blue-600 text-white rounded-lg">
            Search
          </button>
          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
            className="bg-gray-500 text-white rounded-lg"
          >
            Reset
          </button>

        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Opening Cash
          </p>

          <p className="text-2xl font-bold text-blue-600">
            ₹ {openingCash}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Total Receipt
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹ {totalReceipt}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Total Payment
          </p>

          <p className="text-2xl font-bold text-red-600">
            ₹ {totalPayment}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Closing Cash
          </p>

          <p className="text-2xl font-bold text-purple-600">
            ₹ {closingCash}
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
              <th className="p-3">Receipt</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Balance</th>
            </tr>
          </thead>

          <tbody>
            {cashEntries.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.voucherNo}</td>
                <td className="p-3">{item.particulars}</td>
                <td className="p-3">₹ {item.receipt}</td>
                <td className="p-3">₹ {item.payment}</td>
                <td className="p-3">₹ {item.balance}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default CashBook;