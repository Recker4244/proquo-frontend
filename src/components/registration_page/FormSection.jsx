"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./FormSection.module.css";

function FormSection({
  label, type, value, tag, onChange, fullWidth = true
}) {
  return (
    <div
      className={`${styles.formSection} ${fullWidth ? styles.fullWidth : ""}`}
    >
      <label htmlFor={label} className={styles.label}>{label}</label>
      {tag === "textarea" ? (
        <textarea
          id={label}
          value={value}
          onChange={onChange}
          className={styles.inputTextArea}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          id={label}
          className={styles.input}
        />
      )}
    </div>
  );
}
FormSection.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool.isRequired
};

export default FormSection;
