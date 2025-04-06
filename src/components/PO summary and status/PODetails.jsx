import React from "react";
import styles from "./PODetails.module.css";

const PODetails = () => {
  const summary = {
    PONumber: "PO# 12-3456",
    supplier: "Acme Construction",
    value: "Rs.2,000",
    quantity: "1",
    delivery: "Jan 15th",
    paymentTerms: "Net 30",
    status: "Pending Approval"
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>PO details</h2>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>PO number</h3>
            <p className={styles.value}>{summary.PONumber}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Supplier</h3>
            <p className={styles.value}>{summary.supplier}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>Value</h3>
            <p className={styles.value}>{summary.value}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Quantity</h3>
            <p className={styles.value}>{summary.quantity}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>Delivery</h3>
            <p className={styles.value}>{summary.delivery}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Payment terms</h3>
            <p className={styles.value}>{summary.paymentTerms}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>Status</h3>
            <p className={styles.value}>{summary.status}</p>
          </div>
        </div>
      </div>
      <button type="button" className={styles.trackButton}>Track PO</button>
      <button type="button" className={styles.dashboardButton}>Go to Dashboard</button>
      <p className={styles.downloadText}>Or download your purchase order PDF</p>
    </section>
  );
};

export default PODetails;
