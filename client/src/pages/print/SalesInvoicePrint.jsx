import React from "react";

function SalesInvoicePrint() {
  return (
    <div style={styles.page}>
      <div style={styles.sheet}>

        {/* Header */}
        <h2 style={styles.company}>GROWW YOU ERP</h2>
        <p style={styles.address}>Agra, Uttar Pradesh, India</p>

        <hr />

        {/* Invoice Info */}
        <div style={styles.row}>
          <div>Invoice No: SI-001</div>
          <div>Date: 09-06-2026</div>
        </div>

        <div style={styles.row}>
          <div>Customer: Rahul Traders</div>
          <div>Mobile: 9876543210</div>
        </div>

        <hr />

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product A</td>
              <td>2</td>
              <td>500</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Product B</td>
              <td>1</td>
              <td>700</td>
              <td>700</td>
            </tr>
          </tbody>
        </table>

        <hr />

        {/* Total */}
        <h3 style={{ textAlign: "right" }}>
          Grand Total: ₹1700
        </h3>

        <br />

        <div style={styles.footer}>
          Authorized Signatory
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#eee",
    minHeight: "100vh",
    padding: 20,
  },
  sheet: {
    background: "white",
    width: "210mm",
    minHeight: "297mm",
    margin: "auto",
    padding: 30,
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  company: {
    textAlign: "center",
    marginBottom: 0,
  },
  address: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  footer: {
    marginTop: 40,
    textAlign: "right",
  },
};

export default SalesInvoicePrint;