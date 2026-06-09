import { useState } from "react";

function Vendors() {
  // Vendor List State
  const [vendors, setVendors] = useState([
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
  const [contactPerson, setContactPerson] = useState("");
  const [creditDays, setCreditDays] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  // Add Vendor Function

  const addVendor = () => {
    if (!name || !mobile) {
      alert("Vendor Name and Mobile are required");

      return;
    }
    if (mobile.length !== 10) {
      alert("Mobile number must be 10 digits");

      return;
    }
    if (gst && gst.length !== 15) {
      alert("GST number must be 15 characters");

      return;
    }

    const mobileExists = vendors.some(
      (vendor) => vendor.mobile === mobile && vendor.id !== editId,
    );

    if (mobileExists) {
      alert("Mobile number already exists");

      return;
    }

    const gstExists = vendors.some(
      (vendor) =>
        vendor.gst === gst && vendor.gst !== "" && vendor.id !== editId,
    );

    if (gstExists) {
      alert("GST number already exists");

      return;
    }

    if (editId !== null) {
      const updatedVendors = vendors.map((vendor) => {
        if (vendor.id === editId) {
          return {
            ...vendor,
            name,
            mobile,
            gst,
            address,
            openingBalance,
            creditLimit,
            contactPerson,
            creditDays,
          };
        }

        return vendor;
      });

      setVendors(updatedVendors);

      setEditId(null);

      setName("");
      setMobile("");
      setGst("");
      setAddress("");
      setOpeningBalance("");
      setCreditLimit("");
      setContactPerson("");
      setCreditDays("");

      return;
    }

    const newVendor = {
      id: vendors.length + 1,
      name: name,
      mobile: mobile,
      gst: gst,
      address: address,
      openingBalance: openingBalance,
      creditLimit: creditLimit,
      contactPerson: contactPerson,
      creditDays: creditDays,
    };
    setVendors([...vendors, newVendor]);

    setName("");
    setMobile("");
    setGst("");
    setAddress("");
    setOpeningBalance("");
    setCreditLimit("");
    setContactPerson("");
    setCreditDays("");

    // Clear Inputs
    setName("");
    setMobile("");
    setGst("");
  };

  // Delete Vendor Function
  const deleteVendor = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedVendors = vendors.filter((vendor) => vendor.id !== id);

    setVendors(updatedVendors);
  };

  return (
    <div>
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vendors</h1>
      </div>

      {/* Form */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Add Vendor</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Vendor Name"
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
          {/* Contact Person */}
          <input
            type="text"
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="border p-3 rounded-lg"
          />
          {/* Credit Days */}

          <input
            type="number"
            placeholder="Credit Days"
            value={creditDays}
            onChange={(e) => setCreditDays(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>

        <button
          onClick={addVendor}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-4 hover:bg-blue-700"
        >
          {editId !== null ? "Update Vendor" : "Add Vendor"}
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

      <div className="bg-white p-4 rounded-xl shadow mb-4 w-64">
        <h3 className="text-gray-500 text-sm">Total Vendors</h3>

        <p className="text-3xl font-bold text-blue-600">{vendors.length}</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Vendor"
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
              <th className="p-4">Contact Person</th>
              <th className="p-4">Credit Days</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {vendors
              .filter((vendor) =>
                vendor.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((vendor, index) => (
                <tr
                  key={vendor.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{vendor.name}</td>

                  <td className="p-4">{vendor.mobile}</td>

                  <td className="p-4">{vendor.gst}</td>

                  <td className="p-4">{vendor.address}</td>

                  <td className="p-4">₹ {vendor.openingBalance || 0}</td>
                  <td className="p-4">₹ {vendor.creditLimit || 0}</td>
                  <td className="p-4">{vendor.contactPerson}</td>
                  <td className="p-4">{vendor.creditDays}</td>

                  <td className="p-4">
                    
                    <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(vendor.id);
                        setName(vendor.name);
                        setMobile(vendor.mobile);
                        setGst(vendor.gst);
                        setAddress(vendor.address);
                        setOpeningBalance(vendor.openingBalance);
                        setCreditLimit(vendor.creditLimit);
                        setContactPerson(vendor.contactPerson || "");
                        setCreditDays(vendor.creditDays || "");
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        console.log(vendor.id);
                        deleteVendor(vendor.id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vendors;
