"use client";

import React from "react";
import Header from "../sections/Header";
import Breadcrumbs from "./Breadcrumbs";
import OrderStatus from "./OrderStatus";
import OrderDetails from "./OrderDetails";
import VerificationForm from "./VerificationForm";
import styles from "./DeliveryPage.module.css";

function DeliveryPage() {
  return (
    <main className={styles.pageContainer}>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Header />
      <section className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Breadcrumbs />
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>Purchase Order 1234</h1>
            <button type="button" className={styles.downloadButton}>Download PDF</button>
          </div>
          <OrderStatus />
          <OrderDetails />
          <VerificationForm />
        </div>
      </section>
    </main>
  );
}

export default DeliveryPage;
