"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SupplierComparison.module.css";
import Header from "../sections/Header";
import ProjectDetails from "./ProjectDetails";
import QuotationTable from "./QuotationTable";
// import CustomPriceSuggestion from "./CustomPriceSuggestion";
// import FilterSection from "./FilterSection";
// import DownloadSection from "./DownloadSection";

function SupplierComparison() {
  const location = useLocation();
  const {
    rfqId
  } = location.state || {};
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <ProjectDetails rfqId={rfqId} />
            <QuotationTable rfqId={rfqId} />
            {/* <CustomPriceSuggestion /> */}
            {/* <FilterSection />
            <DownloadSection /> */}
          </div>
        </main>
      </div>
    </>
  );
}

export default SupplierComparison;
