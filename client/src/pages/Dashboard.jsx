import { useEffect, useState } from "react";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const stats = {
    customers: 25,
    vendors: 12,
    products: 150,
    sales: 125000,
    purchase: 85000,


  };




  const recentActivities = [
    { id: 1, action: "Customer Added", name: "Amit Traders" },
    { id: 2, action: "Purchase Entry", name: "Invoice PUR-002" },
    { id: 3, action: "Vendor Added", name: "XYZ Suppliers" },
  ];

  const topCustomers = [
    { name: "Amit Traders", amount: 25000 },
    { name: "Sharma Enterprises", amount: 18000 },
    { name: "RK Industries", amount: 15000 },
  ];

  const topVendors = [
    { name: "ABC Suppliers", amount: 22000 },
    { name: "XYZ Traders", amount: 17000 },
    { name: "Global Distributors", amount: 14000 },
  ];

  const lowStockItems = [
    { name: "Laptop", stock: 3 },
    { name: "Mouse", stock: 5 },
    { name: "Keyboard", stock: 2 },
  ];

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-16 bg-gray-300 rounded-xl"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="h-24 bg-gray-300 rounded-xl"></div>
          <div className="h-24 bg-gray-300 rounded-xl"></div>
          <div className="h-24 bg-gray-300 rounded-xl"></div>
          <div className="h-24 bg-gray-300 rounded-xl"></div>
          <div className="h-24 bg-gray-300 rounded-xl"></div>
        </div>

        <div className="h-40 bg-gray-300 rounded-xl"></div>
        <div className="h-40 bg-gray-300 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold">Welcome to Groww You ERP</h1>
        <p className="mt-2">Manage your business efficiently in one system</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Customers</p>
          <h2 className="text-2xl font-bold">{stats.customers}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Vendors</p>
          <h2 className="text-2xl font-bold">{stats.vendors}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Products</p>
          <h2 className="text-2xl font-bold">{stats.products}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Sales</p>
          <h2 className="text-2xl font-bold">₹ {stats.sales}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Purchase</p>
          <h2 className="text-2xl font-bold">₹ {stats.purchase}</h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Add Customer
          </button>

          <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
            Add Vendor
          </button>

          <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
            Add Product
          </button>

          <button className="bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700">
            Sales Invoice
          </button>

          <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700">
            Purchase Invoice
          </button>
        </div>
      </div>

      {/* Business Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">Business Summary</h2>
          <p>Total Sales: ₹ {stats.sales}</p>
          <p>Total Purchase: ₹ {stats.purchase}</p>
          <p>Profit: ₹ {stats.sales - stats.purchase}</p>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">Recent Activities</h2>

          <ul className="space-y-2">
            {recentActivities.map((item) => (
              <li key={item.id} className="border-b pb-2">
                <p className="font-semibold">{item.action}</p>
                <p className="text-sm text-gray-500">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Today's Stats */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">Today's Stats</h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-500">Sales</p>
            <h3 className="text-xl font-bold">₹ 12,500</h3>
          </div>

          <div>
            <p className="text-gray-500">Purchase</p>
            <h3 className="text-xl font-bold">₹ 8,200</h3>
          </div>

          <div>
            <p className="text-gray-500">Orders</p>
            <h3 className="text-xl font-bold">18</h3>
          </div>

        </div>

      </div>

      {/* Dashboard V2 Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Monthly Sales</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹ 3,50,000
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Monthly Purchase</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₹ 2,20,000
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Outstanding Amount</p>
          <h2 className="text-2xl font-bold text-red-600">
            ₹ 75,000
          </h2>
        </div>

      </div>

      {/* Top Customers & Vendors */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">
            Top Customers
          </h2>

          {topCustomers.map((customer, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2"
            >
              <span>{customer.name}</span>
              <span>₹ {customer.amount}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">
            Top Vendors
          </h2>

          {topVendors.map((vendor, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2"
            >
              <span>{vendor.name}</span>
              <span>₹ {vendor.amount}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Low Stock Alert */}

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3 text-red-600">
          Low Stock Alerts
        </h2>

        {lowStockItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-2"
          >
            <span>{item.name}</span>
            <span className="text-red-600 font-semibold">
              {item.stock} Left
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;