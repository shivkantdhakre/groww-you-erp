import React from "react";

export default function ReceiptVoucherPrint() {
    return (
        <div style={{ padding: 20, background: "#eee", minHeight: "100vh" }}>
            <div style={{ width: "210mm", margin: "auto", background: "#fff", padding: 30 }}>

                <h2 style={{ textAlign: "center" }}>Receipt Voucher</h2>
                <hr />

                <p>Receipt No: RV-001</p>
                <p>Date: 09-06-2026</p>
                <p>Received From: ABC Customer</p>

                <hr />

                <h3 style={{ textAlign: "right" }}>Amount: ₹3000</h3>

                <div style={{ marginTop: 60, textAlign: "right" }}>
                    Authorized Signatory
                </div>

            </div>
        </div>
    );
}