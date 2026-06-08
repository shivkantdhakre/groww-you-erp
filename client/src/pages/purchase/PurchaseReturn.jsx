import { useState } from "react";

function PurchaseReturn() {
    const [returnNo, setReturnNo] = useState(1);
    const [returnDate, setReturnDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [vendor, setVendor] = useState("");
    const [purchaseInvoiceNo, setPurchaseInvoiceNo] = useState("");
    const [reason, setReason] = useState("");
    const [product, setProduct] = useState("");
    const [qty, setQty] = useState("");
    const [rate, setRate] = useState("");

    const [returns, setReturns] = useState([]);

    // Amount calculation
    const amount =
        (parseFloat(qty) || 0) * (parseFloat(rate) || 0);

    // Add Return
    const addReturn = () => {
        if (
            !vendor ||
            !purchaseInvoiceNo ||
            !product ||
            !qty ||
            !rate
        ) {
            alert("Please fill all required fields");
            return;
        }

        if (qty <= 0 || rate <= 0) {
            alert("Qty and Rate must be greater than 0");
            return;
        }

        const newReturn = {
            returnNo: `PR-${String(returnNo).padStart(3, "0")}`,
            returnDate,
            vendor,
            purchaseInvoiceNo,
            reason,
            product,
            qty,
            rate,
            amount,
        };

        setReturns([...returns, newReturn]);
        setReturnNo(returnNo + 1);

        // Reset form
        setVendor("");
        setPurchaseInvoiceNo("");
        setReason("");
        setProduct("");
        setQty("");
        setRate("");

        alert("Purchase Return Saved Successfully");
    };

    // Total Summary
    const totalReturnAmount = returns.reduce(
        (total, item) => total + item.amount,
        0
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Purchase Return
            </h1>

            {/* FORM */}
            <div className="bg-white p-5 rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Return Number */}
                    <input
                        type="text"
                        value={`PR-${String(returnNo).padStart(3, "0")}`}
                        readOnly
                        className="border p-3 rounded-lg bg-gray-100"
                    />

                    {/* Return Date */}
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) =>
                            setReturnDate(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Vendor */}
                    <input
                        type="text"
                        placeholder="Vendor Name"
                        value={vendor}
                        onChange={(e) =>
                            setVendor(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Purchase Invoice Number */}
                    <input
                        type="text"
                        placeholder="Purchase Invoice Number"
                        value={purchaseInvoiceNo}
                        onChange={(e) =>
                            setPurchaseInvoiceNo(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Reason */}
                    <input
                        type="text"
                        placeholder="Reason"
                        value={reason}
                        onChange={(e) =>
                            setReason(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Product */}
                    <input
                        type="text"
                        placeholder="Product"
                        value={product}
                        onChange={(e) =>
                            setProduct(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Qty */}
                    <input
                        type="number"
                        placeholder="Qty"
                        value={qty}
                        onChange={(e) =>
                            setQty(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Rate */}
                    <input
                        type="number"
                        placeholder="Rate"
                        value={rate}
                        onChange={(e) =>
                            setRate(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    />

                    {/* Amount */}
                    <input
                        type="text"
                        value={`₹ ${amount}`}
                        readOnly
                        className="border p-3 rounded-lg bg-gray-100"
                    />
                </div>

                <button
                    onClick={addReturn}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4"
                >
                    Save Return
                </button>
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-5 rounded-xl shadow mt-6 w-72">
                <h3 className="text-gray-500">
                    Total Return Amount
                </h3>
                <p className="text-3xl font-bold text-red-600">
                    ₹ {totalReturnAmount}
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white p-5 rounded-xl shadow mt-6 overflow-x-auto">
                <table className="w-full border-collapse">

                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-3">Return Number</th>
                            <th className="p-3">Return Date</th>
                            <th className="p-3">Vendor</th>
                            <th className="p-3">Purchase Invoice No</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Rate</th>
                            <th className="p-3">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {returns.map((item, index) => (
                            <tr
                                key={index}
                                className="border-t text-center"
                            >
                                <td className="p-3">
                                    {item.returnNo}
                                </td>
                                <td className="p-3">
                                    {item.returnDate}
                                </td>
                                <td className="p-3">
                                    {item.vendor}
                                </td>
                                <td className="p-3">
                                    {item.purchaseInvoiceNo}
                                </td>
                                <td className="p-3">
                                    {item.reason}
                                </td>
                                <td className="p-3">
                                    {item.product}
                                </td>
                                <td className="p-3">
                                    {item.qty}
                                </td>
                                <td className="p-3">
                                    ₹ {item.rate}
                                </td>
                                <td className="p-3">
                                    ₹ {item.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default PurchaseReturn;