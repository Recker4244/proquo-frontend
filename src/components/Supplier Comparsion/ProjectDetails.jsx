import React from "react";
import styles from "./SupplierComparison.module.css";

function ProjectDetails() {
  return (
    <section className={styles.projectDetails}>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderContent}>
          <h2 className={styles.projectTitle}>Compare Quotations</h2>
          <p className={styles.projectDescription}>
            You have received 3 quotes. You can compare prices, delivery times,
            and terms to choose the best offer.
          </p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Project Details</h3>

      <div className={styles.detailsGrid}>
        <div className={styles.detailsRow}>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Name</span>
            <span className={styles.detailValue}>Tunnel Construction</span>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>RFQ #</span>
            <span className={styles.detailValue}>RFQ 12345</span>
          </div>
        </div>

        <div className={styles.detailsRow}>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Status</span>
            <span className={styles.detailValue}>Open for Evaluation</span>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Total Cost</span>
            <span className={styles.detailValue}>Rs.500,000</span>
          </div>
        </div>

        <div className={styles.detailsRow}>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Delivery Time</span>
            <span className={styles.detailValue}>24 weeks</span>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Payment Terms</span>
            <span className={styles.detailValue}>Advanced</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProjectDetails;
