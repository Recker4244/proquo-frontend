import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SupplierComparison.module.css";

function ProjectDetails({ rfqId }) {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${apiUrl}/rfq/rfq/${rfqId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch RFQ summary");
        }
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Could not load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [rfqId]);
  const { totalQuotations, uniqueSuppliers } = React.useMemo(() => {
    if (!summary.items) return { totalQuotations: 0, uniqueSuppliers: 0 };

    let count = 0;
    const supplierSet = new Set();

    summary.items.forEach((item) => {
      if (item.quotationItems && item.quotationItems.length > 0) {
        count += item.quotationItems.length;
        item.quotationItems.forEach((qi) => {
          // Get supplier name from nested structure
          const supplierName = qi.quotation?.supplierName;
          if (supplierName) supplierSet.add(supplierName);
        });
      }
    });

    return { totalQuotations: count, uniqueSuppliers: supplierSet.size };
  }, [summary.items]);
  const bestDeliveryTime = React.useMemo(() => {
    if (!summary.items || summary.items.length === 0) return null;

    // For each item, get the minimum delivery time from quotations
    const minTimes = summary.items.map((item) => {
      if (!item.quotations || item.quotations.length === 0) return Infinity;
      return Math.min(...item.quotations.map((q) => q.deliveryTimeWeeks));
    });

    // Return the minimum delivery time across all items
    return Math.min(...minTimes);
  }, [summary.items]);

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.projectDetails}>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderContent}>
          <h2 className={styles.projectTitle}>Compare Quotations</h2>
          <p className={styles.projectDescription}>
            You have received
            {" "}
            <strong>{totalQuotations}</strong>
            {" "}
            quotes from
            {" "}
            <strong>{uniqueSuppliers}</strong>
            {" "}
            supplier
            {uniqueSuppliers !== 1 && "s"}
            . You can compare prices, delivery times, and terms to choose the best offer.
          </p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Project Details</h3>

      <div className={styles.detailsGrid}>
        <div className={styles.detailsRow}>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Name</span>
            <span className={styles.detailValue}>{summary.project?.project_name}</span>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>RFQ #</span>
            <span className={styles.detailValue}>{summary.id}</span>
          </div>
        </div>

        <div className={styles.detailsRow}>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Status</span>
            <span className={styles.detailValue}>{summary.status}</span>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Quantity</span>
            <span className={styles.detailValue}>
              {summary.quantity}
            </span>
          </div>
        </div>

        <div className={styles.detailsRow}>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Delivery Time</span>
            <span className={styles.detailValue}>{bestDeliveryTime}</span>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Payment Terms</span>
            <span className={styles.detailValue}>{summary.paymentTerms}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
ProjectDetails.propTypes = {
  rfqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProjectDetails;
