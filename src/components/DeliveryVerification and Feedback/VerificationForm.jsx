"use client";
import React from "react";
import styles from "./VerificationForm.module.css";

const VerificationForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Verification & Feedback</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Quality Check"
            aria-label="Quality Check"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Delivered Bags Count"
            aria-label="Delivered Bags Count"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Damage Count"
            aria-label="Damage Count"
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            className={styles.textarea}
            placeholder="Feedback"
            aria-label="Feedback"
          />
        </div>
        <div className={styles.submitWrapper}>
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </div>
      </form>
    </section>
  );
};

export default VerificationForm;
