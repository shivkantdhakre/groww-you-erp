import { useState, useEffect } from "react";
import CommonModal from "../../components/common/CommonModal";
import Autocomplete from "../../components/common/Autocomplete";
import { useStore } from "../../store/useStore";
import api from "../../utils/api";

function SalesInvoice() {
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  
  const [customerId, setCustomerId] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: Date.now(),
      itemId: "",
      itemName: "",
      qty: 1,
      rate: 0,
      gstPercentage: 0,
      amount: 0,
      currentStock: 0
    },
  ]);

  const [savedInvoices, setSavedInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Zustand Master Data Cache
  const customers = useStore((state) => state.customers);
  const items = useStore((state) => state.items);
  const fetchCustomers = useStore((state) => state.fetchCustomers);
  const fetchItems = useStore((state) => state.fetchItems);

  // Fetch Masters and Invoices on Mount
  useEffect(() => {
    fetchCustomers();
    fetchItems();
    fetchSalesInvoices();
  }, []);

  const fetchSalesInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const res = await api.get("/transactions/sales-invoices");
      setSavedInvoices(res.data);
    } catch (err) {
      console.error("Failed to fetch sales invoices:", err);
    } finally {
      setLoadingInvoices(false);
    }
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      itemId: "",
      itemName: "",
      qty: 1,
      rate: 0,
      gstPercentage: 0,
      amount: 0,
      currentStock: 0
    };
    setInvoiceItems([...invoiceItems, newRow]);
  };

  const deleteRow = (id) => {
    if (invoiceItems.length === 1) {
      setMessage("At least one item row is required");
      setMessageType("warning");
      return;
    }
    const updatedItems = invoiceItems.filter((item) => item.id !== id);
    setInvoiceItems(updatedItems);
  };

  const updateItemDetails = (id, dbItem) => {
    const updatedItems = invoiceItems.map((item) => {
      if (item.id === id) {
        const qty = Number(item.qty) || 1;
        const rate = Number(dbItem.salePrice) || 0;
        const gstPct = Number(dbItem.gstPercentage) || 0;
        const subtotal = rate * qty;
        const gstAmount = Math.round((subtotal * gstPct / 100) * 100) / 100;
        return {
          ...item,
          itemId: dbItem.id,
          itemName: dbItem.name,
          rate,
          gstPercentage: gstPct,
          amount: Math.round((subtotal + gstAmount) * 100) / 100,
          currentStock: dbItem.openingStock
        };
      }
      return item;
    });
    setInvoiceItems(updatedItems);
  };

  const clearItemDetails = (id) => {
    const updatedItems = invoiceItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          itemId: "",
          itemName: "",
          rate: 0,
          gstPercentage: 0,
          amount: 0,
          currentStock: 0
        };
      }
      return item;
    });
    setInvoiceItems(updatedItems);
  };

  const updateItemQty = (id, qtyValue) => {
    const updatedItems = invoiceItems.map((item) => {
      if (item.id === id) {
        const qty = parseInt(qtyValue) || 0;
        const rate = Number(item.rate) || 0;
        const gstPct = Number(item.gstPercentage) || 0;
        const subtotal = rate * qty;
        const gstAmount = Math.round((subtotal * gstPct / 100) * 100) / 100;
        return {
          ...item,
          qty,
          amount: Math.round((subtotal + gstAmount) * 100) / 100
        };
      }
      return item;
    });
    setInvoiceItems(updatedItems);
  };

  const grandTotal = Math.round(
    invoiceItems.reduce((total, item) => total + Number(item.amount), 0) * 100
  ) / 100;

  const totalItems = invoiceItems.length;

  const totalQty = invoiceItems.reduce(
    (total, item) => total + (Number(item.qty) || 0),
    0
  );

  const handleSaveInvoice = async () => {
    if (!invoiceDate) {
      setMessage("Invoice Date is required");
      setMessageType("error");
      return;
    }

    if (!customerId) {
      setMessage("Customer selection is required");
      setMessageType("error");
      return;
    }

    const hasInvalidItem = invoiceItems.some(
      (item) => !item.itemId || Number(item.qty) <= 0
    );

    if (hasInvalidItem) {
      setMessage("Please select a valid Item and enter Quantity for all rows");
      setMessageType("warning");
      return;
    }

    // Client-side stock check warning before submitting
    const stockErrorItem = invoiceItems.find(
      (item) => Number(item.qty) > item.currentStock
    );
    if (stockErrorItem) {
      setMessage(
        `Insufficient stock for ${stockErrorItem.itemName}. Available: ${stockErrorItem.currentStock}, Requested: ${stockErrorItem.qty}`
      );
      setMessageType("error");
      return;
    }

    try {
      const payload = {
        customerId,
        invoiceDate,
        items: invoiceItems.map((item) => ({
          itemId: item.itemId,
          qty: item.qty
        }))
      };

      await api.post("/transactions/sales-invoices", payload);

      // Force refresh of Master Items to get updated database stock levels!
      await fetchItems(true);

      // Reload saved invoices table
      fetchSalesInvoices();

      // Reset Form state
      setCustomerId(null);
      setInvoiceItems([
        {
          id: Date.now(),
          itemId: "",
          itemName: "",
          qty: 1,
          rate: 0,
          gstPercentage: 0,
          amount: 0,
          currentStock: 0
        },
      ]);

      setMessage("Sales Invoice created successfully!");
      setMessageType("success");
      setShowSaveModal(true);

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      console.error("Failed to create sales invoice:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to create sales invoice";
      setMessage(errorMsg);
      setMessageType("error");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sales Invoice</h1>

      {message && (
        <div
          className={`p-4 rounded-lg mb-4 text-white font-medium shadow-md transition-all duration-300 ${
            messageType === "success"
              ? "bg-emerald-600"
              : messageType === "warning"
              ? "bg-amber-500"
              : "bg-rose-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* Invoice Header Details */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Invoice No
            </label>
            <input
              type="text"
              value="[Auto-Generated]"
              readOnly
              className="border border-gray-200 p-3 rounded-lg w-full bg-gray-50 text-gray-500 font-mono"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Customer Name
            </label>
            <Autocomplete
              options={customers}
              labelKey="name"
              valueKey="id"
              placeholder="Select Customer..."
              selectedId={customerId}
              searchFields={["name", "mobile"]}
              customRender={(opt) => (
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-gray-800">{opt.name}</span>
                  <span className="text-sm text-gray-500">{opt.mobile}</span>
                </div>
              )}
              onSelect={(opt) => setCustomerId(opt.id)}
              onClear={() => setCustomerId(null)}
            />
          </div>
        </div>
      </div>

      {/* Invoice Rows */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Invoice Items</h2>

        <table className="w-full min-w-[700px] mb-4">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left font-semibold text-sm">Item</th>
              <th className="p-3 text-left font-semibold text-sm w-32">Available Stock</th>
              <th className="p-3 text-left font-semibold text-sm w-28">Qty</th>
              <th className="p-3 text-left font-semibold text-sm w-36">Rate</th>
              <th className="p-3 text-left font-semibold text-sm w-24">GST %</th>
              <th className="p-3 text-left font-semibold text-sm w-36">Total (incl. GST)</th>
              <th className="p-3 text-center font-semibold text-sm w-24">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {invoiceItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition">
                <td className="p-3 align-top">
                  <Autocomplete
                    options={items}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Search Item..."
                    selectedId={item.itemId}
                    searchFields={["name", "sku"]}
                    customRender={(opt) => (
                      <div className="flex justify-between w-full">
                        <span className="font-semibold text-gray-800">{opt.name}</span>
                        <span className="text-sm text-gray-500">
                          Stock: {opt.openingStock} | Price: ₹{opt.salePrice}
                        </span>
                      </div>
                    )}
                    onSelect={(opt) => updateItemDetails(item.id, opt)}
                    onClear={() => clearItemDetails(item.id)}
                  />
                </td>

                <td className="p-3 align-top font-semibold text-gray-700">
                  {item.itemId ? (
                    <span className={item.currentStock <= 0 ? "text-rose-600" : "text-gray-700"}>
                      {item.currentStock}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="p-3 align-top">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateItemQty(item.id, e.target.value)}
                    className="border border-gray-200 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>

                <td className="p-3 align-top font-semibold text-gray-700 pt-5">
                  {item.itemId ? `₹ ${item.rate}` : "-"}
                </td>

                <td className="p-3 align-top font-semibold text-gray-500 pt-5">
                  {item.itemId ? `${item.gstPercentage}%` : "-"}
                </td>

                <td className="p-3 align-top font-bold text-gray-800 pt-5">
                  {item.itemId ? `₹ ${item.amount}` : "-"}
                </td>

                <td className="p-3 text-center align-top">
                  <button
                    onClick={() => deleteRow(item.id)}
                    className="bg-rose-50 text-rose-600 px-3 py-2 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition font-medium"
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
          className="bg-indigo-50 text-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-100 transition font-semibold"
        >
          + Add Item
        </button>

        {/* Totals Summary */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6 shadow-inner">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Invoice Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Items</p>
              <p className="text-3xl font-extrabold text-gray-800">{totalItems}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">Total Qty</p>
              <p className="text-3xl font-extrabold text-gray-800">{totalQty}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">Grand Total (Tax Included)</p>
              <p className="text-3xl font-extrabold text-emerald-600">₹ {grandTotal}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveInvoice}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition font-bold shadow-md shadow-emerald-600/10"
          >
            Save Sales Invoice
          </button>
        </div>
      </div>

      {/* Saved Invoices Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Invoices</h2>
        {loadingInvoices ? (
          <div className="text-center py-6 text-gray-500">Loading invoices...</div>
        ) : savedInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left font-semibold text-sm">Invoice No</th>
                  <th className="p-3 text-left font-semibold text-sm">Date</th>
                  <th className="p-3 text-left font-semibold text-sm">Customer</th>
                  <th className="p-3 text-left font-semibold text-sm">Items count</th>
                  <th className="p-3 text-left font-semibold text-sm">Qty</th>
                  <th className="p-3 text-left font-semibold text-sm">Grand Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {savedInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-3 text-gray-900 font-mono font-semibold">
                      {invoice.invoiceNo}
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(invoice.invoiceDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-gray-700 font-medium">
                      {invoice.customer?.name || "-"}
                    </td>
                    <td className="p-3 text-gray-600">{invoice.totalItems}</td>
                    <td className="p-3 text-gray-600">{invoice.totalQty}</td>
                    <td className="p-3 text-emerald-600 font-bold">
                      ₹ {invoice.grandTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">No invoices saved yet</div>
        )}
      </div>

      <CommonModal isOpen={showSaveModal} title="Invoice Saved">
        <p className="mb-4 text-gray-600">
          The Sales Invoice has been recorded and stock levels have been successfully updated.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setShowSaveModal(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            OK
          </button>
        </div>
      </CommonModal>
    </div>
  );
}

export default SalesInvoice;