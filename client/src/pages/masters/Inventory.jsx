import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";

function Inventory() {
  // Bind to global Zustand store
  const items = useStore((state) => state.items);
  const loading = useStore((state) => state.loadingItems);
  const fetchItems = useStore((state) => state.fetchItems);
  const addItemStore = useStore((state) => state.addItem);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [gstPercentage, setGstPercentage] = useState("");
  const [unit, setUnit] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [minStockAlert, setMinStockAlert] = useState("10");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch/refresh on component mount (no-op if already cached)
  useEffect(() => {
    fetchItems().catch((err) => {
      console.error("Failed to load items:", err);
      setMessage("Failed to load items from database.");
      setMessageType("error");
    });
  }, [fetchItems]);

  const addItem = async () => {
    if (!name || !sku) {
      setMessage("Item Name and SKU/Code are required");
      setMessageType("error");
      return;
    }
    if (purchasePrice && Number(purchasePrice) < 0) {
      setMessage("Purchase Price cannot be negative");
      setMessageType("error");
      return;
    }
    if (salePrice && Number(salePrice) < 0) {
      setMessage("Sale Price cannot be negative");
      setMessageType("error");
      return;
    }
    if (openingStock && Number(openingStock) < 0) {
      setMessage("Opening Stock cannot be negative");
      setMessageType("error");
      return;
    }

    const itemExists = items.some(
      (item) => item.sku === sku && item.id !== editId,
    );

    if (itemExists) {
      setMessage("Item SKU/Code already exists");
      setMessageType("warning");
      return;
    }

    if (gstPercentage && !["0", "5", "12", "18", "28"].includes(String(gstPercentage))) {
      setMessage("GST % must be 0, 5, 12, 18 or 28");
      setMessageType("error");
      return;
    }

    if (editId !== null) {
      // Mock update locally since PUT is not on backend yet
      const updatedItems = items.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            name,
            sku,
            category,
            hsnCode,
            gstPercentage: parseFloat(gstPercentage) || 0.0,
            unit,
            purchasePrice: parseFloat(purchasePrice) || 0.0,
            salePrice: parseFloat(salePrice) || 0.0,
            openingStock: parseInt(openingStock) || 0,
            minStockAlert: parseInt(minStockAlert) || 0,
          };
        }
        return item;
      });

      useStore.setState({ items: updatedItems });
      setEditId(null);
      setName("");
      setSku("");
      setCategory("");
      setHsnCode("");
      setGstPercentage("");
      setUnit("");
      setPurchasePrice("");
      setSalePrice("");
      setOpeningStock("");
      setMinStockAlert("10");
      setMessage("Item Updated Successfully (Local)");
      setMessageType("success");
      return;
    }

    try {
      await addItemStore({
        name,
        sku,
        category,
        unit,
        purchasePrice: parseFloat(purchasePrice) || 0.0,
        salePrice: parseFloat(salePrice) || 0.0,
        gstPercentage: parseFloat(gstPercentage) || 0.0,
        openingStock: parseInt(openingStock) || 0,
        minStockAlert: parseInt(minStockAlert) || 10,
        hsnCode,
      });

      setName("");
      setSku("");
      setCategory("");
      setHsnCode("");
      setGstPercentage("");
      setUnit("");
      setPurchasePrice("");
      setSalePrice("");
      setOpeningStock("");
      setMinStockAlert("10");
      setMessage("Item Saved Successfully");
      setMessageType("success");
    } catch (err) {
      console.error("Failed to save item:", err);
      setMessage(err.response?.data?.message || "Failed to save item to database.");
      setMessageType("error");
    }
  };

  const deleteItem = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) {
      return;
    }

    // Since backend does not have DELETE yet, delete locally in store for now
    const updatedItems = items.filter((item) => item.id !== id);
    useStore.setState({ items: updatedItems });
    setMessage("Item Deleted Successfully (Local)");
    setMessageType("success");
  };


  return (
    <div>
      <h1 className="text-3xl font-bold">Inventory</h1>
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">
          {editId !== null ? "Edit Item Master" : "Add Item Master"}
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="SKU / Item Code"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="HSN Code"
            value={hsnCode}
            onChange={(e) => setHsnCode(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="GST %"
            value={gstPercentage}
            onChange={(e) => setGstPercentage(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Unit (e.g. Pcs, Box, Kg)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Sale Price"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Opening Stock"
            value={openingStock}
            onChange={(e) => setOpeningStock(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Min Stock Alert"
            value={minStockAlert}
            onChange={(e) => setMinStockAlert(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            {editId !== null ? "Update Item" : "Add Item"}
          </button>
          <button
            onClick={() => {
              setEditId(null);
              setName("");
              setSku("");
              setCategory("");
              setHsnCode("");
              setGstPercentage("");
              setUnit("");
              setPurchasePrice("");
              setSalePrice("");
              setOpeningStock("");
              setMinStockAlert("10");
            }}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg mb-4 text-white mt-4 ${
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
        <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow mt-4">
          <svg className="animate-spin h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-slate-600 font-medium">Loading inventory...</span>
        </div>
      ) : (
        <>
          {/* Inventory Count Card */}
          <div className="bg-white p-4 rounded-xl shadow mb-4 mt-4 w-72">
            <h3 className="text-gray-500 text-sm">Total Items</h3>
            <p className="text-3xl font-bold text-blue-600">{items.length}</p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search Item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg mb-4 w-full"
          />

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-left p-4">Sr No</th>
                  <th className="text-left p-4">Item Name</th>
                  <th className="text-left p-4">SKU / Code</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">HSN</th>
                  <th className="text-left p-4">GST %</th>
                  <th className="text-left p-4">Unit</th>
                  <th className="text-left p-4">Purchase Price</th>
                  <th className="text-left p-4">Sale Price</th>
                  <th className="text-left p-4">Opening Stock</th>
                  <th className="text-left p-4">Stock Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {items
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.sku || "N/A"}</td>
                      <td className="p-4">{item.category || "N/A"}</td>
                      <td className="p-4">{item.hsnCode || "N/A"}</td>
                      <td className="p-4">{item.gstPercentage || 0}%</td>
                      <td className="p-4">{item.unit}</td>
                      <td className="p-4">₹ {item.purchasePrice}</td>
                      <td className="p-4">₹ {item.salePrice}</td>
                      <td className="p-4">{item.openingStock}</td>
                      <td className="p-4">
                        {Number(item.openingStock) < (item.minStockAlert || 10) ? (
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                            Low Stock
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            In Stock
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditId(item.id);
                              setName(item.name);
                              setSku(item.sku || "");
                              setCategory(item.category || "");
                              setHsnCode(item.hsnCode || "");
                              setGstPercentage(item.gstPercentage || "");
                              setUnit(item.unit || "");
                              setPurchasePrice(item.purchasePrice || "");
                              setSalePrice(item.salePrice || "");
                              setOpeningStock(item.openingStock || "");
                              setMinStockAlert(item.minStockAlert || "10");
                            }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 cursor-pointer"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteItem(item.id)}
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

export default Inventory;

