import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../sections/Header";
import PurchaseOrdersTable from "./PurchaseOrdersTable";
import styles from "./PurchaseOrder.module.css";

function PurchaseOrder() {
  const navigate = useNavigate();
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <Header />
        <section className={styles.content}>
          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <h2 className={styles.title}>Purchase Orders</h2>
              <button type="button" onClick={() => navigate('/createProject')} className={styles.addButton}>New Order</button>
            </div>
            <h2 className={styles.subtitle}>Track and manage all cement orders efficiently.</h2>
            <PurchaseOrdersTable />
          </div>
        </section>
      </main>
    </>
  );
}
export default PurchaseOrder;
