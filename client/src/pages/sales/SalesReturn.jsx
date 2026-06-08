import { useState } from "react";

function SalesReturn() {
    const [returnNo, setReturnNo] = useState(1);
    const [returnDate, setReturnDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [customer, setCustomer] = useState("");
    const [invoiceNo, setInvoiceNo] = useState("");
    const [reason, setReason] = useState("");
    const [product, setProduct] = useState("");
    const [qty, setQty] = useState("");
    const [rate, setRate] = useState("");

    const [returns, setReturns] = useState([]);

    const amount =
        (parseFloat(qty) || 0) * (parseFloat(rate) || 0);

    const addReturn = () => {
        if (!customer || !invoiceNo || !product || !qty || !rate) {
            alert("Please fill all required fields");
            return;
        }

        if (qty <= 0 || rate <= 0) {
            alert("Qty and Rate must be greater than 0");
            return;
        }

        const newReturn = {
            returnNo: `SR-${String(returnNo).padStart(3, "0")}`,
            returnDate,
            customer,
            invoiceNo,
            reason,
            product,
            qty,
            rate,
            amount,
        };

        setReturns([...returns, newReturn]);
        setReturnNo(returnNo + 1);

        setCustomer("");
        setInvoiceNo("");
        setReason("");
        setProduct("");
        setQty("");
        setRate("");

        alert("Return added successfully!");
    };

    const totalReturnAmount = returns.reduce(
        (total, item) => total + item.amount,
        0
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Sales Return
            </h1>

            {/* FORM */}
            <div className="bg-white p-5 rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        value={`SR-${String(returnNo).padStart(3, "0")}`}
                        readOnly
                        className="border p-3 rounded-lg bg-gray-100"
                    />

                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Select Customer</option>
                        <option>Rahul Sharma</option>
                        <option>Amit Kumar</option>
                        <option>Priya Enterprises</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Invoice Number"
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        placeholder="Qty"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        placeholder="Rate"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        value={`₹ ${amount}`}
                        readOnly
                        className="border p-3 rounded-lg bg-gray-100"
                    />
                </div>

                <button
                    onClick={addReturn}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
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
            <div className="bg-white p-5 rounded-xl shadow mt-6">
                <table className="w-full border-collapse">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Return No</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Invoice No</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Rate</th>
                            <th className="p-3">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {returns.map((item, index) => (
                            <tr key={index} className="border-t text-center">

                                <td className="p-3">{item.returnNo}</td>
                                <td className="p-3">{item.returnDate}</td>
                                <td className="p-3">{item.customer}</td>
                                <td className="p-3">{item.invoiceNo}</td>
                                <td className="p-3">{item.reason}</td>
                                <td className="p-3">{item.product}</td>
                                <td className="p-3">{item.qty}</td>
                                <td className="p-3">₹ {item.rate}</td>
                                <td className="p-3">₹ {item.amount}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default SalesReturn;