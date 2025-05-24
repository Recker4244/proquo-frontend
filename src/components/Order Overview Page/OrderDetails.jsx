import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./OrderDetails.module.css";
import Header from "../sections/Header";
import OrderOverview from "./OrderOverview";
import ProductTable from "./ProductTable";
import ShipmentPaymentDetails from "./ShipmentPaymentDetails";

function OrderDetails() {
  const { state } = useLocation();
  const poId = state?.poId;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <section className={styles.orderSection}>
            <h1 className={styles.orderTitle}>Order #23489</h1>
            <div className={styles.actionButtons}>
              <button type="submit" className={styles.primaryButton}>Approve Order</button>
              <button type="submit" className={styles.secondaryButton}>Reject Order</button>
            </div>
            <ProductTable poId={poId} />
            <ShipmentPaymentDetails poId={poId} />
          </section>
          <aside className={styles.sidebar}>
            <OrderOverview poId={poId} />
          </aside>
        </main>
      </div>
    </>
  );
}

export default OrderDetails;
