import React from "react";
import styles from "./OrderStatus.module.css";

function OrderStatus() {
  const orderStatus = {
    deliveryDate: "Jul 23, 2023"
  };
  return (
    <section className={styles.statusSection}>
      <p className={styles.statusText}>Delivered</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
      <time className={styles.deliveryDate}>{orderStatus.deliveryDate}</time>
    </section>
  );
}

export default OrderStatus;
