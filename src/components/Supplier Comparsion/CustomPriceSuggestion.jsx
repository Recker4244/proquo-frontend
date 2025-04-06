"use client";

import React from "react";
import styles from "./SupplierComparison.module.css";

const CustomPriceSuggestion = () => {
  return (
    <section className={styles.suggestionSection}>
      <div className={styles.suggestionForm}>
        <input
          type="text"
          placeholder="Suggest Custom Price"
          className={styles.priceInput}
        />
      </div>
      <div className={styles.actionContainer}>
        <button type="button" className={styles.actionButton}>Request Reevaluation</button>
      </div>
      <p className={styles.suggestionNote}>
        After submitting your suggestion, the supplier will have 3 days to
        respond. Once they do, you will have 3 days to accept or reject their
        update.
      </p>
    </section>
  );
};
export default CustomPriceSuggestion;
