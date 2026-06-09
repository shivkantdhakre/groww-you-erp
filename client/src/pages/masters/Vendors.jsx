import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";

function Vendors() {
  // Bind to global Zustand store
  const vendors = useStore((state) => state.vendors);
  const loading = useStore((state) => state.loadingVendors);
  const fetchVendors = useStore((state) => state.fetchVendors);
  const addVendorStore = useStore((state) => state.addVendor);

  // Form State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [creditDays, setCreditDays] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch/refresh on component mount (no-op if already cached)
  useEffect(() => {
    fetchVendors().catch((err) => {
      console.error("Failed to load vendors:", err);
      setMessage("Failed to load vendors from database.");
      setMessageType("error");
    });
  }, [fetchVendors]);

  // Add/Update Vendor Function
  const addVendor = async () => {
    if (!name || !mobile) {
      setMessage("Vendor Name and Mobile are required");
      setMessageType("error");
      return;
    }
    if (mobile.length !== 10) {
      setMessage("Mobile number must be 10 digits");
      setMessageType("error");
      return;
    }
    if (gstin && gstin.length !== 15) {
      setMessage("GSTIN number must be 15 characters");
      setMessageType("error");
      return;
    }

    const mobileExists = vendors.some(
      (vendor) => vendor.mobile === mobile && vendor.id !== editId,
    );

    if (mobileExists) {
      setMessage("Mobile number already exists");
      setMessageType("warning");
      return;
    }

    const gstinExists = vendors.some(
      (vendor) =>
        vendor.gstin === gstin && vendor.gstin !== "" && vendor.id !== editId,
    );

    if (gstinExists) {
      setMessage("GSTIN number already exists");
      setMessageType("warning");
      return;
    }

    if (editId !== null) {
      // Mock update locally since PUT is not on backend yet
      const updatedVendors = vendors.map((vendor) => {
        if (vendor.id === editId) {
          return {
            ...vendor,
            name,
            mobile,
            gstin,
            address,
            openingBalance: parseFloat(openingBalance) || 0.0,
            creditLimit: parseFloat(creditLimit) || 0.0,
            contactPerson,
            creditDays,
          };
        }
        return vendor;
      });

      useStore.setState({ vendors: updatedVendors });
      setEditId(null);
      setName("");
      setMobile("");
      setGstin("");
      setAddress("");
      setOpeningBalance("");
      setCreditLimit("");
      setContactPerson("");
      setCreditDays("");
      setMessage("Vendor Updated Successfully (Local)");
      setMessageType("success");
      return;
    }

    try {
      await addVendorStore({
        name,
        mobile,
        gstin,
        address,
        openingBalance: parseFloat(openingBalance) || 0.0,
        creditLimit: parseFloat(creditLimit) || 0.0,
        contactPerson,
        creditDays,
      });

      setName("");
      setMobile("");
      setGstin("");
      setAddress("");
      setOpeningBalance("");
      setCreditLimit("");
      setContactPerson("");
      setCreditDays("");
      setMessage("Vendor Saved Successfully");
      setMessageType("success");
    } catch (err) {
      console.error("Failed to save vendor:", err);
      setMessage(err.response?.data?.message || "Failed to save vendor to database.");
      setMessageType("error");
    }
  };

  // Delete Vendor Function
  const deleteVendor = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?",
    );

    if (!confirmDelete) {
      return;
    }

    // Since backend does not have DELETE yet, delete locally in store for now
    const updatedVendors = vendors.filter((vendor) => vendor.id !== id);
    useStore.setState({ vendors: updatedVendors });
    setMessage("Vendor Deleted Successfully (Local)");
    setMessageType("success");
  };

  return (
    <div>
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vendors</h1>
      </div>

      {/* Form */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editId !== null ? "Edit Vendor" : "Add Vendor"}
        </h2>

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

        <div className="mt-4 flex gap-2">
          <button
            onClick={addVendor}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            {editId !== null ? "Update Vendor" : "Add Vendor"}
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
              setContactPerson("");
              setCreditDays("");
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
          <span className="text-slate-600 font-medium">Loading vendors...</span>
        </div>
      ) : (
        <>
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
                  <th className="text-left p-4">GSTIN</th>
                  <th className="text-left p-4">Address</th>
                  <th className="text-left p-4">Opening Balance</th>
                  <th className="text-left p-4">Credit Limit</th>
                  <th className="text-left p-4">Contact Person</th>
                  <th className="text-left p-4">Credit Days</th>
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
                      <td className="p-4">{vendor.gstin || "N/A"}</td>
                      <td className="p-4">{vendor.address || "N/A"}</td>
                      <td className="p-4">₹ {vendor.openingBalance || 0}</td>
                      <td className="p-4">₹ {vendor.creditLimit || 0}</td>
                      <td className="p-4">{vendor.contactPerson || "N/A"}</td>
                      <td className="p-4">{vendor.creditDays || "N/A"}</td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditId(vendor.id);
                              setName(vendor.name);
                              setMobile(vendor.mobile);
                              setGstin(vendor.gstin || "");
                              setAddress(vendor.address || "");
                              setOpeningBalance(vendor.openingBalance || "");
                              setCreditLimit(vendor.creditLimit || "");
                              setContactPerson(vendor.contactPerson || "");
                              setCreditDays(vendor.creditDays || "");
                            }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 cursor-pointer"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteVendor(vendor.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
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
        </>
      )}
    </div>
  );
}

export default Vendors;
