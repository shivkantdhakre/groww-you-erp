import { useState } from "react";

function OutstandingReport() {
  const [activeTab, setActiveTab] = useState("customer");

  const customerData = [
    {
      name: "Rahul Sharma",
      mobile: "9876543210",
      outstanding: 15000,
    },
    {
      name: "Amit Verma",
      mobile: "9876543211",
      outstanding: 8000,
    },
    {
      name: "Priya Gupta",
      mobile: "9876543212",
      outstanding: 12000,
    },
  ];

  const vendorData = [
    {
      name: "ABC Traders",
      mobile: "9999999991",
      outstanding: 25000,
    },
    {
      name: "XYZ Suppliers",
      mobile: "9999999992",
      outstanding: 18000,
    },
    {
      name: "PQR Enterprises",
      mobile: "9999999993",
      outstanding: 10000,
    },
  ];

  const totalReceivable = customerData.reduce(
    (total, item) => total + item.outstanding,
    0
  );

  const totalPayable = vendorData.reduce(
    (total, item) => total + item.outstanding,
    0
  );

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Outstanding Report
      </h1>

      <p className="text-gray-500 mb-6">
        Track receivables and payables
      </p>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Total Receivable
          </p>

          <p className="text-3xl font-bold text-green-600">
            ₹ {totalReceivable}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Total Payable
          </p>

          <p className="text-3xl font-bold text-red-600">
            ₹ {totalPayable}
          </p>
        </div>

      </div>

      {/* Tabs */}

      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setActiveTab("customer")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "customer"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Customer Outstanding
        </button>

        <button
          onClick={() => setActiveTab("vendor")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "vendor"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Vendor Outstanding
        </button>

      </div>

      {/* Table */}

      <div className="bg-white p-5 rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Outstanding</th>
            </tr>
          </thead>

          <tbody>

            {(activeTab === "customer"
              ? customerData
              : vendorData
            ).map((item, index) => (
              <tr key={index} className="border-t">

                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">
                  {item.mobile}
                </td>

                <td className="p-3 font-semibold text-red-600">
                  ₹ {item.outstanding}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OutstandingReport;