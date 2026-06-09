import { useState, useEffect } from "react";
import api from "../../utils/api";

function Customers() {
  // Customer List State
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [creditLimit, setCreditLimit] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch real data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/masters/customers");
        setCustomers(response.data);
      } catch (err) {
        console.error("Failed to load customers:", err);
        setMessage("Failed to load customers from database.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Add/Update Customer Function
  const addCustomer = async () => {
    if (!name || !mobile) {
      setMessage("Customer Name and Mobile are required");
      setMessageType("error");
      return;
    }
    if (mobile.length !== 10) {
      setMessage("Invalid Mobile Number (must be 10 digits)");
      setMessageType("error");
      return;
    }
    if (gstin && gstin.length !== 15) {
      setMessage("Invalid GSTIN Number (must be 15 characters)");
      setMessageType("error");
      return;
    }

    const mobileExists = customers.some(
      (customer) => customer.mobile === mobile && customer.id !== editId
    );

    if (mobileExists) {
      setMessage("Mobile Number Already Exists");
      setMessageType("warning");
      return;
    }

    const gstinExists = customers.some(
      (customer) =>
        customer.gstin === gstin && customer.gstin !== "" && customer.id !== editId
    );

    if (gstinExists) {
      setMessage("GSTIN Number Already Exists");
      setMessageType("warning");
      return;
    }

    if (editId !== null) {
      // Mock update locally since PUT is not on backend yet
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === editId) {
          return {
            ...customer,
            name,
            mobile,
            gstin,
            address,
            openingBalance: parseFloat(openingBalance) || 0.0,
            creditLimit: parseFloat(creditLimit) || 0.0
          };
        }
        return customer;
      });

      setCustomers(updatedCustomers);
      setEditId(null);
      setName("");
      setMobile("");
      setGstin("");
      setAddress("");
      setOpeningBalance("");
      setCreditLimit("");
      setMessage("Customer Updated Successfully (Local)");
      setMessageType("success");
      return;
    }

    try {
      const response = await api.post("/masters/customers", {
        name,
        mobile,
        gstin,
        address,
        openingBalance: parseFloat(openingBalance) || 0.0,
        creditLimit: parseFloat(creditLimit) || 0.0
      });

      setCustomers([...customers, response.data]);
      setName("");
      setMobile("");
      setGstin("");
      setAddress("");
      setOpeningBalance("");
      setCreditLimit("");
      setMessage("Customer Saved Successfully");
      setMessageType("success");
    } catch (err) {
      console.error("Failed to save customer:", err);
      setMessage(err.response?.data?.message || "Failed to save customer to database.");
      setMessageType("error");
    }
  };

  // Delete Customer Function
  const deleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    // Since backend does not have DELETE yet, delete locally for now
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
    setMessage("Customer Deleted Successfully (Local)");
    setMessageType("success");
  };

  return (
    <div>
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
      </div>

      {/* Form */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editId !== null ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Mobile */}
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* GSTIN */}
          <input
            type="text"
            placeholder="GSTIN Number"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Opening Balance */}
          <input
            type="number"
            placeholder="Opening Balance"
            value={openingBalance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Credit Limit */}
          <input
            type="number"
            placeholder="Credit Limit"
            value={creditLimit}
            onChange={(e) => setCreditLimit(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={addCustomer}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            {editId !== null ? "Update Customer" : "Add Customer"}
          </button>

          <button
            onClick={() => {
              setEditId(null);
              setName("");
              setMobile("");
              setGstin("");
              setAddress("");
              setOpeningBalance("");
              setCreditLimit("");
            }}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg mb-4 text-white ${
            messageType === "success"
              ? "bg-green-500"
              : messageType === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow">
          <svg className="animate-spin h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-slate-600 font-medium">Loading customers...</span>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-xl shadow mb-4 w-64">
            <h3 className="text-gray-500 text-sm">Total Customers</h3>
            <p className="text-3xl font-bold text-blue-600">{customers.length}</p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg mb-4 w-full"
          />

          {/* Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-left p-4">Sr No</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Mobile</th>
                  <th className="text-left p-4">GSTIN</th>
                  <th className="text-left p-4">Address</th>
                  <th className="text-left p-4">Opening Balance</th>
                  <th className="text-left p-4">Credit Limit</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {customers
                  .filter((customer) =>
                    customer.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((customer, index) => (
                    <tr
                      key={customer.id}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{customer.name}</td>
                      <td className="p-4">{customer.mobile}</td>
                      <td className="p-4">{customer.gstin || "N/A"}</td>
                      <td className="p-4">{customer.address || "N/A"}</td>
                      <td className="p-4">₹ {customer.openingBalance || 0}</td>
                      <td className="p-4">₹ {customer.creditLimit || 0}</td>

                      <td className="p-4">
                        <button
                          onClick={() => {
                            setEditId(customer.id);
                            setName(customer.name);
                            setMobile(customer.mobile);
                            setGstin(customer.gstin || "");
                            setAddress(customer.address || "");
                            setOpeningBalance(customer.openingBalance || "");
                            setCreditLimit(customer.creditLimit || "");
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCustomer(customer.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                        >
                          Delete
                        </button>
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

export default Customers;
