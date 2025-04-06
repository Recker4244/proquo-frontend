import React from "react";
import FormSection from "../registration_page/FormSection";
import styles from "./RFQPage.module.css";

function RFQForm() {
  return (
    <section className={styles.rfqSection}>
      <h2 className={styles.rfqTitle}>Request for Quotation (RFQ)</h2>
      <p className={styles.rfqDescription}>
        Fill in the details below to request a quotation from suppliers for your
        project
      </p>
      <form>
        <div className={styles.formGroup}>
          <FormSection label="Cement Type" type="text" tag="input" />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroupHalf}>
            <FormSection label="Quantity" type="text" tag="input" />
          </div>
          <div className={styles.formGroupHalf}>
            <FormSection label="Units" type="text" tag="input" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <FormSection label="Delivery Location" type="text" tag="textarea" />
        </div>

        <div className={styles.formGroup}>
          <FormSection label="Preferred delivery date" type="date" tag="input" />
        </div>

        <div className={styles.formGroup}>
          <FormSection label="Additional notes/requirements" type="text" tag="textarea" />
        </div>

        <div className={styles.formAction}>
          <button type="submit" className={styles.primaryButton}>
            Submit RFQ
          </button>
        </div>

        <div className={styles.formAction}>
          <button type="button" className={styles.secondaryButton}>
            Upload Excel Sheet
          </button>
        </div>
      </form>
    </section>
  );
}

export default RFQForm;
