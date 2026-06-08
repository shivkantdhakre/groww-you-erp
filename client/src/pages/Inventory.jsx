import { useState } from "react";
function Inventory() {
  const [items, setItems] = useState([]);

  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [gst, setGst] = useState("");
  const [unit, setUnit] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [saleRate, setSaleRate] = useState("");
  const [openingStock, setOpeningStock] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const addItem = () => {
    if (!itemName || !itemCode) {
      alert("Item Name and Item Code are required");
      return;
    }
    if (purchaseRate && Number(purchaseRate) < 0) {
      alert("Purchase Rate cannot be negative");
      return;
    }

    if (saleRate && Number(saleRate) < 0) {
      alert("Sale Rate cannot be negative");
      return;
    }

    if (openingStock && Number(openingStock) < 0) {
      alert("Opening Stock cannot be negative");
      return;
    }
    const itemExists = items.some(
      (item) => item.itemCode === itemCode && item.id !== editId,
    );

    if (itemExists) {
      alert("Item Code already exists");
      return;
    }

    if (gst && !["0", "5", "12", "18", "28"].includes(gst)) {
      alert("GST must be 0, 5, 12, 18 or 28");
      return;
    }

    if (editId !== null) {
      const updatedItems = items.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            itemName,
            itemCode,
            hsnCode,
            gst,
            unit,
            purchaseRate,
            saleRate,
            openingStock,
          };
        }

        return item;
      });

      setItems(updatedItems);

      setEditId(null);
    } else {
      const newItem = {
        id: items.length + 1,
        itemName,
        itemCode,
        category,
        hsnCode,
        gst,
        unit,
        purchaseRate,
        saleRate,
        openingStock,
      };

      setItems([...items, newItem]);
    }

    setItemName("");
    setItemCode("");
    setHsnCode("");
    setGst("");
    setUnit("");
    setPurchaseRate("");
    setSaleRate("");
    setOpeningStock("");
  };

  const deleteItem = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedItems = items.filter((item) => item.id !== id);

    setItems(updatedItems);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Inventory Page</h1>
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Item Master</h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Item Code"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
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
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Purchase Rate"
            value={purchaseRate}
            onChange={(e) => setPurchaseRate(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Sale Rate"
            value={saleRate}
            onChange={(e) => setSaleRate(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Opening Stock"
            value={openingStock}
            onChange={(e) => setOpeningStock(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          {editId !== null ? "Update Item" : "Add Item"}
        </button>
        <button
          onClick={() => {
            setEditId(null);
            setItemName("");
            setItemCode("");
            setHsnCode("");
            setGst("");
            setUnit("");
            setPurchaseRate("");
            setSaleRate("");
            setOpeningStock("");
          }}
          className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

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
              <th className="text-left p-4">Item Code</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">HSN</th>
              <th className="text-left p-4">GST %</th>
              <th className="text-left p-4">Unit</th>
              <th className="text-left p-4">Purchase Rate</th>
              <th className="text-left p-4">Sale Rate</th>
              <th className="text-left p-4">Opening Stock</th>
              <th className="text-left p-4">Stock Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {items
              .filter((item) =>
                item.itemName.toLowerCase().includes(search.toLowerCase()),
              )
              .map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{item.itemName}</td>
                  <td className="p-4">{item.itemCode}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.hsnCode}</td>
                  <td className="p-4">{item.gst}%</td>
                  <td className="p-4">{item.unit}</td>
                  <td className="p-4">₹ {item.purchaseRate}</td>
                  <td className="p-4">₹ {item.saleRate}</td>
                  <td className="p-4">{item.openingStock}</td>
                  <td className="p-4">
                    {Number(item.openingStock) < 10 ? (
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
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setItemName(item.itemName);
                        setItemCode(item.itemCode);
                        setHsnCode(item.hsnCode);
                        setGst(item.gst);
                        setUnit(item.unit);
                        setPurchaseRate(item.purchaseRate);
                        setSaleRate(item.saleRate);
                        setOpeningStock(item.openingStock);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
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
export default Inventory;
