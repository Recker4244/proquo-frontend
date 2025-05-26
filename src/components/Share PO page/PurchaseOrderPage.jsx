"use client";

import React from "react";
import styles from "./PurchaseOrderPage.module.css";
import Header from "../sections/Header";
import SupplierConfirmation from "./SupplierConfirmation";
import Footer from "../sections/Footer";

function PurchaseOrderPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.mainContainer}>
        <Header />
        <SupplierConfirmation />
        <Footer />
      </main>
    </>
  );
}

export default PurchaseOrderPage;
