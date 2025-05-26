import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./POSummary.module.css";
import Header from "../sections/Header";
import SuccessBanner from "./SuccessBanner";
import PODetails from "./PODetails";
import Footer from "../sections/Footer";

function POSummary() {
  const { state } = useLocation();
  const poId = state?.poId;

  if (!poId) {
    return (
      <div className={styles.error}>
        No purchase order found. Please start from the RFQ page.
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.content}>
            <SuccessBanner />
            <PODetails poId={poId} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default POSummary;
