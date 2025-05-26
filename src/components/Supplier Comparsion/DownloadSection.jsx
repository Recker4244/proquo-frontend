import React from "react";
import styles from "./SupplierComparison.module.css";

function DownloadSection() {
  return (
    <section className={styles.downloadSection}>
      <h3 className={styles.downloadTitle}>Download</h3>
      <div className={styles.downloadContainer}>
        <button type="button" className={styles.downloadButton}>Download as CSV</button>
      </div>
    </section>
  );
}
export default DownloadSection;
