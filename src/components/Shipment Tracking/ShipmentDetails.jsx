import React from "react";
import styles from "./ShipmentDetails.module.css";

function ShipmentDetails() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Shipment Details</h2>
      <div className={styles.content}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Carrier</span>
          <span className={styles.value}>Fast Freight LLC</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Tracking Number</span>
          <span className={styles.value}>TRACK-987654321</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Estimated Delivery</span>
          <span className={styles.value}>July 23, 2024, 12:00 PM</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Delivery Address</span>
          <span className={styles.value}>
            123 Main Street, Anytown, CA 91234
          </span>
        </div>
      </div>
    </section>
  );
}

export default ShipmentDetails;
