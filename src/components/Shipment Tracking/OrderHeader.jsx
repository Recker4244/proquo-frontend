import React from "react";
import styles from "./OrderHeader.module.css";

function OrderHeader() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Order #789456</h2>
      <nav className={styles.tabsContainer}>
        <a href="#order" className={styles.tabItem}>
          Order Details
        </a>
        <a href="#shipment" className={styles.tabItem}>
          Shipment Details
        </a>
        <a href="#invoice" className={styles.tabItem}>
          Invoice Details
        </a>
      </nav>
    </section>
  );
}

export default OrderHeader;
