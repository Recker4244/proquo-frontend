import React from "react";
import styles from "./OrderOverview.module.css";
import ProgressBar from "./ProgressBar";

function OrderOverview() {
  const Overview = {
    OrderDate: "Jul 1, 2025",
    ExpectedDelivery: "Jul 10, 2025",
    Supplier: "Superior Cement Inc.",
    status: "In Transit",
    shipmentProgress: "60%"
  };
  return (
    <aside className={styles.container}>
      <h2 className={styles.title}>Order Overview</h2>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Order Date</span>
          <span className={styles.value}>{Overview.OrderDate}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Expected Delivery</span>
          <span className={styles.value}>{Overview.ExpectedDelivery}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Supplier</span>
          <span className={styles.value}>{Overview.Supplier}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Status</span>
          <span className={styles.value}>{Overview.status}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressTitle}>Shipment Progress</span>
          <span className={styles.progressValue}>{Overview.shipmentProgress}</span>
        </div>
        <ProgressBar progress={Number(Overview.shipmentProgress.replace("%", ""))} />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.actionButton}>View Shipment Details</button>
        <button type="submit" className={styles.actionButton}>Contact Supplier</button>
      </div>
    </aside>
  );
}

export default OrderOverview;
