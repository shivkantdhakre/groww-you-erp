import React from "react";

export default function PurchaseInvoicePrint() {
    return (
        <div style={{ padding: 20, background: "#eee", minHeight: "100vh" }}>
            <div style={{ width: "210mm", margin: "auto", background: "#fff", padding: 30 }}>

                <h2 style={{ textAlign: "center" }}>GROWW YOU ERP</h2>
                <p style={{ textAlign: "center" }}>Purchase Invoice</p>

                <hr />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>Purchase No: PI-001</div>
                    <div>Date: 09-06-2026</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>Vendor: ABC Suppliers</div>
                </div>

                <hr />

                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item A</td><td>3</td><td>400</td><td>1200</td>
                        </tr>
                    </tbody>
                </table>

                <hr />

                <h3 style={{ textAlign: "right" }}>Grand Total: ₹1200</h3>

                <p style={{ textAlign: "right", marginTop: 40 }}>
                    Authorized Signatory
                </p>

            </div>
        </div>
    );
}