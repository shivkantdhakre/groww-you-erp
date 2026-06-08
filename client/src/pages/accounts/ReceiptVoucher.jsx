import { useState } from "react";

function PaymentVoucher() {
    const [voucherNo] = useState("PV-001");
    const [voucherDate, setVoucherDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [customer, setcustomer] = useState("");
    const [ReceiptMode, setReceiptMode] = useState("");
    const [amount, setAmount] = useState("");
    const [referenceNo, setReferenceNo] = useState("");
    const [remarks, setRemarks] = useState("");

    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");

    const savePayment = () => {
        if (!customer || !ReceiptMode || !amount) {
            alert("Please fill all required fields");
            return;
        }
        if (Number(amount) <= 0) {
            alert("Amount must be greater than 0");
            return;
        }

        const newPayment = {
            voucherNo,
            voucherDate,
            customer,
            amount,
            ReceiptMode,
            referenceNo,
            remarks,
        };

        setPayments([...payments, newPayment]);

        setcustomer("");
        setReceiptMode("");
        setAmount("");
        setReferenceNo("");
        setRemarks("");

        alert("Receipt Voucher Saved");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Receipt Voucher
            </h1>

            <div className="bg-white p-5 rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        value={voucherNo}
                        readOnly
                        className="border p-3 rounded-lg bg-gray-100"
                    />

                    <input
                        type="date"
                        value={voucherDate}
                        onChange={(e) => setVoucherDate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        value={customer}
                        onChange={(e) => setcustomer(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Select customer</option>
                        <option>Rahul Sharma</option>
                        <option>Amit Kumar</option>
                        <option>Priya Enterprises</option>
                    </select>

                    <select
                        value={ReceiptMode}
                        onChange={(e) => setReceiptMode(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Receipt Mode</option>
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>UPI</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Reference Number"
                        value={referenceNo}
                        onChange={(e) => setReferenceNo(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                </div>

                <textarea
                    placeholder="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="border p-3 rounded-lg w-full mt-4"
                />

                <button
                    onClick={savePayment}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
                >
                    Save Voucher
                </button>
            </div>
            <div className="bg-white p-5 rounded-xl shadow mt-6 mb-4 w-72">
                <h3 className="text-gray-500">
                    Total Receipts
                </h3>

                <p className="text-3xl font-bold text-green-600">
                    ₹{" "}
                    {payments.reduce(
                        (total, payment) =>
                            total + Number(payment.amount),
                        0
                    )}
                </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow mt-6">
                <h2 className="text-xl font-bold mb-4">
                    Receipt History
                </h2>

                <input
                    type="text"
                    placeholder="Search customer"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 rounded-lg mb-4 w-full"
                />
                <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Voucher No</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">customer</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Mode</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments
                            .filter((payment) =>
                                payment.customer
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((payment, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{payment.voucherNo}</td>
                                    <td className="p-3">{payment.voucherDate}</td>
                                    <td className="p-3">{payment.customer}</td>
                                    <td className="p-3">₹ {payment.amount}</td>
                                    <td className="p-3">{payment.ReceiptMode}</td>

                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                const updatedPayments = payments.filter(
                                                    (_, i) => i !== index
                                                );
                                                setPayments(updatedPayments);
                                            }}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
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

export default PaymentVoucher;