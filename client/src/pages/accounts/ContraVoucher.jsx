import { useState } from "react";

function ContraVoucher() {
    const [voucherNo] = useState("CV-001");
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [transferFrom, setTransferFrom] = useState("");
    const [transferTo, setTransferTo] = useState("");
    const [amount, setAmount] = useState("");
    const [narration, setNarration] = useState("");

    const [entries, setEntries] = useState([]);

    const saveVoucher = () => {
        if (
            !transferFrom ||
            !transferTo ||
            !amount
        ) {
            alert("Please fill all required fields");
            return;
        }

        const newEntry = {
            voucherNo,
            date,
            transferFrom,
            transferTo,
            amount,
            narration,
        };

        setEntries([...entries, newEntry]);

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

            </div>

            {/* Table */}

            <div className="bg-white p-5 rounded-xl shadow mt-6">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Voucher No</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Transfer From</th>
                            <th className="p-3">Transfer To</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Narration</th>
                        </tr>
                    </thead>

                    <tbody>
                        {entries.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{item.voucherNo}</td>
                                <td className="p-3">{item.date}</td>
                                <td className="p-3">{item.transferFrom}</td>
                                <td className="p-3">{item.transferTo}</td>
                                <td className="p-3">₹ {item.amount}</td>
                                <td className="p-3">{item.narration}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default ContraVoucher;