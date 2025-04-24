import React from "react";
import styles from "./SupplierInfo.module.css";

function SupplierInfo() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Supplier Information</h2>
      <div className={styles.content}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Supplier Name</span>
          <span className={styles.value}>Concrete Solutions Inc.</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Contact Person</span>
          <span className={styles.value}>Mark Thompson</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Phone Number</span>
          <span className={styles.value}>(555) 123-4567</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>
            mark.thompson@concretesolutions.com
          </span>
        </div>
      </div>
    </section>
  );
}

export default SupplierInfo;
