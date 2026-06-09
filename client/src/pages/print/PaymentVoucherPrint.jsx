import React from "react";

export default function PaymentVoucherPrint() {
    return (
        <div style={container}>
            <div style={sheet}>
                <h2 style={center}>Payment Voucher</h2>
                <hr />

                <p>Voucher No: PV-001</p>
                <p>Date: 09-06-2026</p>
                <p>Paid To: XYZ Vendor</p>

                <hr />

                <h3 style={{ textAlign: "right" }}>Amount: ₹5000</h3>

                <div style={{ marginTop: 60, textAlign: "right" }}>
                    Authorized Signatory
                </div>
            </div>
        </div>
    );
}

const container = { background: "#eee", minHeight: "100vh", padding: 20 };
const sheet = { width: "210mm", margin: "auto", background: "#fff", padding: 30 };
const center = { textAlign: "center" };