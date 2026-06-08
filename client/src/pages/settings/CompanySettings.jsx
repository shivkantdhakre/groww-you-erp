import { useState } from "react";

function CompanySettings() {
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const saveSettings = () => {

    if (!companyName) {
      alert("Company Name is required");
      return;
    }

    if (gstNumber && gstNumber.length !== 15) {
      alert("Invalid GST Number");
      return;
    }

    if (mobile && mobile.length !== 10) {
      alert("Invalid Mobile Number");
      return;
    }

    alert("Company Settings Saved Successfully");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Company Settings
      </h1>

      <p className="text-gray-500 mb-6">
        Manage company information
      </p>

      <div className="bg-white p-6 rounded-xl shadow">

        {/* Company Details */}

        <h2 className="text-xl font-semibold mb-4">
          Company Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="GST Number"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="PAN Number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-3 rounded-lg w-full mt-4"
          rows="3"
        />

        {/* Bank Details */}

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Bank Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Account Number"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        {/* Logo Upload */}

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Company Logo
        </h2>

        <input
          type="file"
          className="border p-3 rounded-lg w-full"
        />

        {/* Save Button */}

        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700"
        >
          Save Settings
        </button>


      </div>
    </div>
  );
}

export default CompanySettings;