import React from "react";
import styles from "./ShipmentPaymentDetails.module.css";

function ShippingPaymentDetails() {
  const ShipmentDetails = {
    deliveryDate: "Jul 10, 2025",
    address: "123 Brickyard Lane, Springfield, IL",
    paymentTerms: "Net 30 Days",
    invoiceDate: "Jul 11, 2025"
  };
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping Details</h2>
        <div className={styles.detailsContent}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Delivery Date</span>
            <span className={styles.value}>{ShipmentDetails.deliveryDate}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Address</span>
            <span className={styles.value}>
              {ShipmentDetails.address}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment Details</h2>
        <div className={styles.detailsContent}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Payment Terms</span>
            <span className={styles.value}>{ShipmentDetails.paymentTerms}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Invoice Date</span>
            <span className={styles.value}>{ShipmentDetails.invoiceDate}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShippingPaymentDetails;
