import { useState } from "react";


function VendorLedger() {
  const vendors = [
    {
      id: 1,
      name: "ABC Traders",
      openingBalance: 5000,
      purchases: [
        {
          invoiceNo: "PUR-001",
          date: "2026-06-04",
          amount: 1000,
        },
        {
          invoiceNo: "PUR-002",
          date: "2026-06-05",
          amount: 2000,
        },
      ],
    },
    {
      id: 2,
      name: "XYZ Suppliers",
      openingBalance: 3000,
      purchases: [
        {
          invoiceNo: "PUR-003",
          date: "2026-06-06",
          amount: 1500,
        },
      ],
    },
  ];

  const [selectedVendor, setSelectedVendor] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const vendorData = vendors.find(
    (vendor) => vendor.name === selectedVendor,
  );

  const totalPurchase =
    vendorData?.purchases.reduce(
      (total, purchase) => total + purchase.amount,
      0,
    ) || 0;

  const outstandingBalance =
    (vendorData?.openingBalance || 0) + totalPurchase;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Vendor Ledger
      </h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div>
            <label className="block mb-2 font-medium">
              Vendor
            </label>

            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Vendor</option>

              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
              Search
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedVendor("");
                setFromDate("");
                setToDate("");
                setSearchTerm("");
              }}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      {vendorData && (
        <>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">
                Opening Balance
              </p>

              <p className="text-2xl font-bold text-blue-600">
                ₹ {vendorData.openingBalance}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">
                Total Purchase
              </p>

              <p className="text-2xl font-bold text-green-600">
                ₹ {totalPurchase}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">
                Total Paid
              </p>

              <p className="text-2xl font-bold text-orange-600">
                ₹ 2000
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">
                Outstanding Balance
              </p>

              <p className="text-2xl font-bold text-red-600">
                ₹ {outstandingBalance}
              </p>
            </div>

          </div>

          <div className="bg-white p-5 rounded-xl shadow mt-6">

            <h2 className="text-xl font-bold mb-4">
              Vendor Ledger
            </h2>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Voucher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded-lg w-72"
              />

              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Export
                </button>

                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Print
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Voucher No</th>
                  <th className="p-3 text-left">
                    Particulars
                  </th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Debit</th>
                  <th className="p-3">Credit</th>
                  <th className="p-3">Balance</th>
                </tr>
              </thead>

              <tbody>
                {vendorData.purchases
                  .filter((purchase) =>
                    purchase.invoiceNo
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((purchase, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{purchase.date}</td>
                      <td className="p-3">{purchase.invoiceNo}</td>
                      <td className="p-3">
                        Purchase Entry
                      </td>
                      <td className="p-3">Purchase</td>
                      <td className="p-3">₹ {purchase.amount}</td>
                      <td className="p-3">₹ 0</td>
                      <td className="p-3">
                        ₹ {vendorData.openingBalance + purchase.amount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default VendorLedger;