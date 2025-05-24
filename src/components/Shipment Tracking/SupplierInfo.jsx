import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SupplierInfo.module.css";

function SupplierInfo({ poId }) {
  const [supplierName, setSupplierName] = useState("-");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(poId);
  
  useEffect(() => {
    if (!poId) return;
    setLoading(true);
    fetch(`/order/${poId}`)
      .then((res) => res.json())
      .then((order) => {
        // Gather all supplier names from order items
        const names = (order.order_items || [])
          .map((item) => item.quotationItem?.quotation?.supplierName)
          .filter(Boolean); // Remove undefined/null
        // Get unique names
        const uniqueNames = Array.from(new Set(names));
        setSupplierName(uniqueNames.length > 0 ? uniqueNames.join(", ") : "-");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch supplier information.");
        setLoading(false);
      });
  }, [poId]);

  if (loading) {
    return <section className={styles.container}>Loading supplier information...</section>;
  }

  if (error) {
    return <section className={styles.container}>{error}</section>;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Supplier Information</h2>
      <div className={styles.content}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Supplier Name</span>
          <span className={styles.value}>{supplierName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Contact Person</span>
          <span className={styles.value}>Contact</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Phone Number</span>
          <span className={styles.value}>Phone Number</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>Email</span>
        </div>
      </div>
    </section>
  );
}

SupplierInfo.propTypes = {
  poId: PropTypes.string.isRequired,
};

export default SupplierInfo;
