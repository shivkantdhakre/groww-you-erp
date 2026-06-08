import { useState } from "react";

function Customers() {
  // Customer List State
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Amit Traders",
      mobile: "9876543210",
      gst: "09ABCDE1234F1Z",
    },
  ]);

  // Form State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [creditLimit, setCreditLimit] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Add Customer Function

  const addCustomer = () => {
    if (!name || !mobile) {
      setMessage("Customer Name and Mobile are required");
      setMessageType("error");

      return;
    }
    if (mobile.length !== 10) {
      setMessage("Invalid Mobile Number");
      setMessageType("error");

      return;
    }
    if (gst && gst.length !== 15) {
      setMessage("Invalid GST Number");
      setMessageType("error");

      return;
    }

    const mobileExists = customers.some(
      (customer) => customer.mobile === mobile && customer.id !== editId,
    );

    if (mobileExists) {
      setMessage("Mobile Number Already Exists");
      setMessageType("warning");

      return;
    }

    const gstExists = customers.some(
      (customer) =>
        customer.gst === gst && customer.gst !== "" && customer.id !== editId,
    );

    if (gstExists) {
      alert("GST number already exists");

      return;
    }

    if (editId !== null) {
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === editId) {
          return {
            ...customer,
            name,
            mobile,
            gst,
            address,
            openingBalance,
            creditLimit,
          };
        }

        return customer;
      });

      setCustomers(updatedCustomers);

      setEditId(null);

      setName("");
      setMobile("");
      setGst("");
      setAddress("");
      setOpeningBalance("");
      setCreditLimit("");
      setMessage("Customer Saved Successfully");
      setMessageType("success");

      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name: name,
      mobile: mobile,
      gst: gst,
      address: address,
      openingBalance: openingBalance,
      creditLimit: creditLimit,
    };
    setCustomers([...customers, newCustomer]);

    setName("");
    setMobile("");
    setGst("");
    setAddress("");
    setOpeningBalance("");
    setCreditLimit("");

    // Clear Inputs
    setName("");
    setMobile("");
    setGst("");
  };

  // Delete Customer Function
  const deleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedCustomers = customers.filter((customer) => customer.id !== id);

    setCustomers(updatedCustomers);
  };

  return (
    <div>
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
      </div>

      {/* Form */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Add Customer</h2>

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

          {/* GST */}
          <input
            type="text"
            placeholder="GST Number"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
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

        <button
          onClick={addCustomer}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-4 hover:bg-blue-700"
        >
          {editId !== null ? "Update Customer" : "Add Customer"}
        </button>

        <button
          onClick={() => {
            setEditId(null);
            setName("");
            setMobile("");
            setGst("");
            setAddress("");
            setOpeningBalance("");
            setCreditLimit("");
          }}
          className="bg-gray-500 text-white px-5 py-3 rounded-lg mt-4 ml-2 hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
      {message && (
        <div
          className={`p-3 rounded-lg mb-4 text-white ${messageType === "success"
            ? "bg-green-500"
            : messageType === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
            }`}
        >
          {message}
        </div>
      )}

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

              <th className="text-left p-4">GST Number</th>

              <th className="text-left p-4">Address</th>

              <th className="text-left p-4">Opening Balance</th>

              <th className="text-left p-4">Credit Limit</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers
              .filter((customer) =>
                customer.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{customer.name}</td>

                  <td className="p-4">{customer.mobile}</td>

                  <td className="p-4">{customer.gst}</td>

                  <td className="p-4">{customer.address}</td>

                  <td className="p-4">₹ {customer.openingBalance || 0}</td>
                  <td className="p-4">₹ {customer.creditLimit || 0}</td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        setEditId(customer.id);
                        setName(customer.name);
                        setMobile(customer.mobile);
                        setGst(customer.gst);
                        setAddress(customer.address);
                        setOpeningBalance(customer.openingBalance);
                        setCreditLimit(customer.creditLimit);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        console.log(customer.id);
                        deleteCustomer(customer.id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
