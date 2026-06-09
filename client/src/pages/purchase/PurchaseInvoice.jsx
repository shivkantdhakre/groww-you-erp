import { useState } from "react";
import CommonModal from "../../components/common/CommonModal";

function PurchaseInvoice() {
  const [purchaseNo] = useState("PUR-001");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [vendorName, setVendorName] = useState("");
  const [vendorGST, setVendorGST] = useState("");
  const [purchaseItems, setPurchaseItems] = useState([
    {
      id: 1,
      itemName: "",
      qty: 1,
      rate: 0,
      amount: 0,
    },
  ]);

  const [savedPurchases, setSavedPurchases] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      itemName: "",
      qty: 1,
      rate: 0,
      amount: 0,
    };

    setPurchaseItems([...purchaseItems, newRow]);
  };

  const updateItem = (id, field, value) => {
    const updatedItems = purchaseItems.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          [field]: value,
        };

        updatedItem.amount = Number(updatedItem.qty) * Number(updatedItem.rate);

        return updatedItem;
      }

      return item;
    });

    setPurchaseItems(updatedItems);
  };

  const removeRow = (id) => {
    if (purchaseItems.length === 1) {
      alert("At least one item row is required");
      return;
    }

    const updatedItems = purchaseItems.filter((item) => item.id !== id);

    setPurchaseItems(updatedItems);
  };

  const grandTotal = purchaseItems.reduce(
    (total, item) => total + Number(item.amount),
    0,
  );

  const totalItems = purchaseItems.length;

  const totalQty = purchaseItems.reduce(
    (total, item) => total + Number(item.qty),
    0,
  );

  const savePurchase = () => {
    if (!purchaseDate) {
      setMessage("Purchase Date is required");
      setMessageType("error");
      return;
    }

    if (!vendorName) {
      setMessage("Vendor Name is required");
      setMessageType("error");
      return;
    }
    if (vendorGST && vendorGST.length !== 15) {
      setMessage("GST Number must be 15 characters");
      setMessageType("warning");
      return;
    }

    const hasInvalidItem = purchaseItems.some(
      (item) =>
        !item.itemName || Number(item.qty) <= 0 || Number(item.rate) <= 0,
    );

    if (hasInvalidItem) {
      setMessage("Please enter Item Name, Qty and Rate for all items");
      setMessageType("warning");
      return;
    }

    const newPurchase = {
      purchaseNo,
      purchaseDate,
      vendorName,
      totalItems,
      totalQty,
      grandTotal,
    };

    setSavedPurchases([...savedPurchases, newPurchase]);

    setShowSaveModal(true);
    setVendorName("");
    setVendorGST("");

    setPurchaseItems([
      {
        id: 1,
        itemName: "",
        qty: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Purchase Invoice</h1>
      {message && (
        <div
          className={`p-3 rounded-lg mb-4 text-white ${messageType === "success"
            ? "bg-green-600"
            : messageType === "warning"
              ? "bg-yellow-500"
              : "bg-red-600"
            }`}
        >
          {message}
        </div>
      )}
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 font-medium">Invoice Number</label>

            <input
              type="text"
              value={purchaseNo}
              readOnly
              className="border p-3 rounded-lg w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Purchase Date</label>

            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Vendor Name</label>

            <select
              value={vendorName}
              onChange={(e) => {
                const selectedVendor = e.target.value;

                setVendorName(selectedVendor);

                if (selectedVendor === "ABC Traders") {
                  setVendorGST("09ABCDE1234F1Z");
                } else if (selectedVendor === "XYZ Suppliers") {
                  setVendorGST("07XYZAB1234C1Z");
                } else if (selectedVendor === "Sharma Agency") {
                  setVendorGST("08PQRS1234D1Z");
                } else {
                  setVendorGST("");
                }
              }}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Vendor</option>
              <option value="ABC Traders">ABC Traders</option>
              <option value="XYZ Suppliers">XYZ Suppliers</option>
              <option value="Sharma Agency">Sharma Agency</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">
          Vendor GST
        </label>

        <input
          type="text"
          value={vendorGST}
          readOnly
          className="border p-3 rounded-lg w-full bg-gray-100"
        />
      </div>

      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Purchase Items</h2>

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Rate</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {purchaseItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) =>
                      updateItem(item.id, "itemName", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(item.id, "rate", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                  />
                </td>

                <td className="p-3 font-semibold">₹ {item.amount}</td>

                <td className="p-3">
                  <button
                    onClick={() => removeRow(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addRow}
          className="bg-green-600 text-white px-5 py-3 rounded-lg mt-4 hover:bg-green-700"
        >
          + Add Item
        </button>

        <div className="bg-gray-100 p-4 rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-3">Purchase Summary</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500">Total Items</p>

              <p className="text-2xl font-bold">{totalItems}</p>
            </div>

            <div>
              <p className="text-gray-500">Total Qty</p>

              <p className="text-2xl font-bold">{totalQty}</p>
            </div>

            <div>
              <p className="text-gray-500">Grand Total</p>

              <p className="text-2xl font-bold text-green-600">
                ₹ {grandTotal}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={savePurchase}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Purchase
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">Purchase History</h2>

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Purchase No</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {savedPurchases.map((purchase, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{purchase.purchaseNo}</td>

                <td className="p-3">{purchase.purchaseDate}</td>

                <td className="p-3">{purchase.vendorName}</td>

                <td className="p-3">{purchase.totalItems}</td>

                <td className="p-3">{purchase.totalQty}</td>

                <td className="p-3">₹ {purchase.grandTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CommonModal
        isOpen={showSaveModal}
        title="Success"
      >
        <p className="mb-4">
          Purchase Saved Successfully
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => setShowSaveModal(false)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            OK
          </button>
        </div>
      </CommonModal>
    </div>
  );
}

export default PurchaseInvoice;