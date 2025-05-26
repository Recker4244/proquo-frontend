import React from "react";
import styles from "./OrderDetails.module.css";

function OrderDetails() {
  const orderDetails = {
    PONumber: "1234",
    Supplier: "JSW Cement",
    type: "Portland",
    quantity: "1000 tons",
    value: "Rs.50,000",
    location: "Delhi",
    deliveryDate: "7/23/25",
    paymentTerms: "Advanced"
  };
  return (
    <section className={styles.detailsSection}>
      <h2 className={styles.sectionTitle}>Order Details</h2>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>PO Number</dt>
          <dd className={styles.detailValue}>{orderDetails.PONumber}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Supplier</dt>
          <dd className={styles.detailValue}>{orderDetails.Supplier}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Type</dt>
          <dd className={styles.detailValue}>{orderDetails.type}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Quantity</dt>
          <dd className={styles.detailValue}>{orderDetails.quantity}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Value</dt>
          <dd className={styles.detailValue}>{orderDetails.value}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Location</dt>
          <dd className={styles.detailValue}>{orderDetails.location}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Delivery Date</dt>
          <dd className={styles.detailValue}>{orderDetails.deliveryDate}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Payment Terms</dt>
          <dd className={styles.detailValue}>{orderDetails.paymentTerms}</dd>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
