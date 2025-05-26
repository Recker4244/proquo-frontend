import React from "react";
import ProjectTable from "./RFQTable";
import styles from "./RFQDashboard.module.css";

function RFQDashboard() {
  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Requests for Quotation</h2>
          <button type="button" className={styles.addButton}>New RFQ</button>
        </div>
        <ProjectTable />
      </div>
    </main>
  );
}

export default RFQDashboard;
