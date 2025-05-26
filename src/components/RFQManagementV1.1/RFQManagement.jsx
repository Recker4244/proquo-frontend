import React from "react";
import styles from "./RFQManagement.module.css";
import Header from "../sections/Header";
// import FilterTabs from "./FilterTabs";
import RFQOverview from "./RFQOverview";
import RFQList from "./RFQList";

function RFQManagement() {
  return (
    <main className={styles.rfqManagement}>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Header />
      <section className={styles.contentContainer}>
        <h1 className={styles.title}>RFQ Management</h1>
        <p className={styles.description}>
          Efficiently manage RFQs, track supplier responses, and optimize
          procurement costs with real-time data insights.
        </p>
        {/* <FilterTabs /> */}
        <h2 className={styles.sectionHeading}>RFQ Overview</h2>
        <RFQOverview />
        <h2 className={styles.sectionHeading}>RFQ List</h2>
        <RFQList />
      </section>
    </main>
  );
}

export default RFQManagement;
