"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./FormSection.module.css";

function FormSection({
  label, type, tag, fullWidth = true
}) {
  return (
    <div
      className={`${styles.formSection} ${fullWidth ? styles.fullWidth : ""}`}
    >
      <label htmlFor="dataInput" className={styles.label}>{label}</label>
      {tag === "textarea" ? (
        <textarea id="dataInput" className={styles.inputTextArea} />
      ) : (
        <input type={type} id="dataInput" className={styles.input} />
      )}

    </div>
  );
}
FormSection.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired
};

export default FormSection;
