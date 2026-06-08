import { useState } from "react";

function SalesInvoice() {
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [customerName, setCustomerName] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      itemName: "",
      qty: 1,
      rate: 0,
      amount: 0,
    },
  ]);

  const [savedInvoices, setSavedInvoices] = useState([]);

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      itemName: "",
      qty: 1,
      rate: 0,
      amount: 0,
    };

    setInvoiceItems([...invoiceItems, newRow]);
  };

  const deleteRow = (id) => {
    if (invoiceItems.length === 1) {
      alert("At least one item row is required");
      return;
    }

    const updatedItems = invoiceItems.filter((item) => item.id !== id);

    setInvoiceItems(updatedItems);
  };

  const updateItem = (id, field, value) => {
    const updatedItems = invoiceItems.map((item) => {
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

    setInvoiceItems(updatedItems);
  };

  const grandTotal = invoiceItems.reduce(
    (total, item) => total + Number(item.amount),
    0,
  );

  const totalItems = invoiceItems.length;

  const totalQty = invoiceItems.reduce(
    (total, item) => total + Number(item.qty),
    0,
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sales Invoice</h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-medium">Invoice No</label>

            <input
              type="text"
              value={invoiceNo}
              readOnly
              className="border p-3 rounded-lg w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Invoice Date</label>

            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Customer Name</label>

            <input
              type="text"
              placeholder="Select Customer"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Invoice Items</h2>

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
            {invoiceItems.map((item) => (
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
                    onClick={() => deleteRow(item.id)}
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
          <h2 className="text-xl font-bold mb-3">Invoice Summary</h2>

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
            onClick={() => {
              if (!invoiceDate) {
                alert("Invoice Date is required");
                return;
              }

              if (!customerName) {
                alert("Customer Name is required");
                return;
              }

              const hasInvalidItem = invoiceItems.some(
                (item) =>
                  !item.itemName ||
                  Number(item.qty) <= 0 ||
                  Number(item.rate) <= 0,
              );

              if (hasInvalidItem) {
                alert("Please enter Item Name, Qty and Rate for all items");
                return;
              }

              const newInvoice = {
                invoiceNo,
                invoiceDate,
                customerName,
                totalItems,
                totalQty,
                grandTotal,
              };

              setSavedInvoices([...savedInvoices, newInvoice]);
              setInvoiceNo(
                `INV-${String(savedInvoices.length + 2).padStart(3, "0")}`,
              );

              setCustomerName("");

              setInvoiceItems([
                {
                  id: 1,
                  itemName: "",
                  qty: 1,
                  rate: 0,
                  amount: 0,
                },
              ]);
              alert("Invoice Saved Successfully");
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Invoice
          </button>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">Saved Invoices</h2>

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {savedInvoices.map((invoice, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{invoice.invoiceNo}</td>
                <td className="p-3">{invoice.invoiceDate}</td>
                <td className="p-3">{invoice.customerName}</td>
                <td className="p-3">{invoice.totalItems}</td>
                <td className="p-3">{invoice.totalQty}</td>
                <td className="p-3">₹ {invoice.grandTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SalesInvoice;
