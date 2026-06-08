import { useState } from "react";

function StockReport() {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [stockStatus, setStockStatus] = useState("");

  const stockData = [
    {
      itemName: "Laptop",
      category: "Electronics",
      currentStock: 5,
      purchaseRate: 40000,
      saleRate: 45000,
    },
    {
      itemName: "Mouse",
      category: "Electronics",
      currentStock: 50,
      purchaseRate: 300,
      saleRate: 500,
    },
    {
      itemName: "Keyboard",
      category: "Electronics",
      currentStock: 8,
      purchaseRate: 800,
      saleRate: 1200,
    },
    {
      itemName: "Chair",
      category: "Furniture",
      currentStock: 20,
      purchaseRate: 1500,
      saleRate: 2200,
    },
    {
      itemName: "Table",
      category: "Furniture",
      currentStock: 3,
      purchaseRate: 3000,
      saleRate: 4500,
    },
  ];

  const totalItems = stockData.length;

  const totalStockQty = stockData.reduce(
    (total, item) => total + item.currentStock,
    0
  );

  const stockValue = stockData.reduce(
    (total, item) =>
      total + item.currentStock * item.purchaseRate,
    0
  );

  const lowStockItems = stockData.filter(
    (item) => item.currentStock < 10
  ).length;

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Stock Report
      </h1>

      <p className="text-gray-500 mb-6">
        Track inventory stock status
      </p>

      {/* Filters */}

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Furniture</option>
          </select>

          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">All Items</option>
            <option>Laptop</option>
            <option>Mouse</option>
            <option>Keyboard</option>
            <option>Chair</option>
            <option>Table</option>
          </select>

          <select
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">All Status</option>
            <option>Low Stock</option>
            <option>In Stock</option>
          </select>

        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Items</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalItems}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Stock Qty</p>
          <p className="text-2xl font-bold text-green-600">
            {totalStockQty}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Stock Value</p>
          <p className="text-2xl font-bold text-purple-600">
            ₹ {stockValue}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Low Stock Items</p>
          <p className="text-2xl font-bold text-red-600">
            {lowStockItems}
          </p>
        </div>

      </div>

      {/* Table */}

      <div className="bg-white p-5 rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Item Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Current Stock</th>
              <th className="p-3">Purchase Rate</th>
              <th className="p-3">Sale Rate</th>
              <th className="p-3">Stock Value</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {stockData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{item.itemName}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.currentStock}</td>
                <td className="p-3">₹ {item.purchaseRate}</td>
                <td className="p-3">₹ {item.saleRate}</td>

                <td className="p-3">
                  ₹ {item.currentStock * item.purchaseRate}
                </td>

                <td className="p-3">
                  {item.currentStock < 10 ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                      Low Stock
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      In Stock
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default StockReport;