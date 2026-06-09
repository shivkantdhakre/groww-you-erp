import { useState } from "react";
import CommonModal from "../../components/common/CommonModal";

function ContraVoucher() {
    const [voucherNo, setVoucherNo] = useState(1);
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [transferFrom, setTransferFrom] = useState("");
    const [transferTo, setTransferTo] = useState("");
    const [amount, setAmount] = useState("");
    const [narration, setNarration] = useState("");

    const [entries, setEntries] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const saveVoucher = () => {
        if (
            !transferFrom ||
            !transferTo ||
            !amount
        ) {
            setMessage("Please fill all required fields");
            setMessageType("error");
            return;
        }
        if (!amount || Number(amount) <= 0) {
            setMessage("Enter valid amount");
            setMessageType("error");
            return;
        }
        if (transferFrom === transferTo) {
            setMessage("Transfer From and Transfer To cannot be same");
            setMessageType("warning");
            return;
        }

        const newEntry = {
            voucherNo: `CV-${voucherNo.toString().padStart(3, "0")}`,
            date,
            transferFrom,
            transferTo,
            amount,
            narration,
        };

        setEntries([...entries, newEntry]);
        setVoucherNo(voucherNo + 1);
        setMessage("Contra Voucher Saved Successfully");
        setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3000);
        setMessageType("success");

        setTransferFrom("");
        setTransferTo("");
        setAmount("");
        setNarration("");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Contra Voucher
            </h1>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        value={voucherNo}
                        readOnly
                        className="border p-3 rounded-lg bg-gray-100"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        value={transferFrom}
                        onChange={(e) => setTransferFrom(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Transfer From</option>
                        <option>Cash</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                    </select>

                    <select
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Transfer To</option>
                        <option>Cash</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Narration"
                        value={narration}
                        onChange={(e) => setNarration(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                </div>

                <button
                    onClick={saveVoucher}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
                >
                    Save Voucher
                </button>
                <button
                    onClick={() => {
                        setTransferFrom("");
                        setTransferTo("");
                        setAmount("");
                        setNarration("");
                        setMessage("");
                        setMessageType("");
                    }}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg mt-4 ml-3"
                >
                    Clear
                </button>

            </div>

            {/* Table */}

            <div className="bg-white p-5 rounded-xl shadow mt-6">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white text-center">
                        <tr>
                            <th className="p-3">Voucher No</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Transfer From</th>
                            <th className="p-3">Transfer To</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Narration</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {entries.map((item, index) => (
                            <tr key={index} className="border-t text-center">
                                <td className="p-3 text-center">{item.voucherNo}</td>
                                <td className="p-3 text-center">{item.date}</td>
                                <td className="p-3 text-center">{item.transferFrom}</td>
                                <td className="p-3 text-center">{item.transferTo}</td>
                                <td className="p-3 text-center">₹ {item.amount}</td>
                                <td className="p-3 text-center">{item.narration}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => {
                                            setDeleteIndex(index);
                                            setShowDeleteModal(true);
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
            <CommonModal
                isOpen={showDeleteModal}
                title="Delete Confirmation"
            >
                <p className="mb-4">
                    Are you sure you want to delete this voucher?
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            const updatedEntries = entries.filter(
                                (_, i) => i !== deleteIndex
                            );

                            setEntries(updatedEntries);
                            setShowDeleteModal(false);

                            setMessage("Voucher Deleted Successfully");
                            setMessageType("success");
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </CommonModal>
        </div>
    );
}

export default ContraVoucher;