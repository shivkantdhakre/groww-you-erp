import { useState } from "react";

function JournalVoucher() {
  const [voucherNo] = useState("JV-001");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [debitAccount, setDebitAccount] = useState("");
  const [creditAccount, setCreditAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");

  const [entries, setEntries] = useState([]);

  const saveVoucher = () => {
    if (
      !debitAccount ||
      !creditAccount ||
      !amount
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newEntry = {
      voucherNo,
      date,
      debitAccount,
      creditAccount,
      amount,
      narration,
    };

    setEntries([...entries, newEntry]);

    setDebitAccount("");
    setCreditAccount("");
    setAmount("");
    setNarration("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Journal Voucher
      </h1>
      <p className="text-gray-500 mb-6">
        Manage journal voucher entries
      </p>

      {/* Form */}

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
            value={debitAccount}
            onChange={(e) => setDebitAccount(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Debit Account</option>
            <option>Cash A/c</option>
            <option>Bank A/c</option>
            <option>Purchase A/c</option>
            <option>Sales A/c</option>
          </select>
          <select
            value={creditAccount}
            onChange={(e) => setCreditAccount(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Credit Account</option>
            <option>Cash A/c</option>
            <option>Bank A/c</option>
            <option>Purchase A/c</option>
            <option>Sales A/c</option>
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
            setDebitAccount("");
            setCreditAccount("");
            setAmount("");
            setNarration("");
          }}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg mt-4 ml-3"
        >
          Clear
        </button>

      </div>

      {/* Table */}

      <div className="bg-white p-5 rounded-xl shadow mt-6">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Voucher No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Debit Account</th>
              <th className="p-3">Credit Account</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{item.voucherNo}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.debitAccount}</td>
                <td className="p-3">{item.creditAccount}</td>
                <td className="p-3">₹ {item.amount}</td>
                <td className="p-3">
                  <button
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

export default JournalVoucher;