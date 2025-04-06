"use client";

import React from "react";
import styles from "./POSummary.module.css";
import Header from "../sections/Header";
import SuccessBanner from "./SuccessBanner";
import PODetails from "./PODetails";
import Footer from "../sections/Footer";

const POSummary = () => {
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
            <PODetails />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default POSummary;
