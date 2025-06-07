"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./FormSection.module.css";

function FormSection({
  label,
  type,
  value,
  tag,
  onChange,
  fullWidth = true,
  placeholder,
  error,
  required = false
}) {
  return (
    <div
      className={`${styles.formSection} ${fullWidth ? styles.fullWidth : ""}`}
    >
      <label htmlFor={label} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {tag === "textarea" ? (
        <textarea
          id={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.inputTextArea} ${error ? styles.inputError : ""}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          id={label}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

FormSection.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  tag: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool
};

FormSection.defaultProps = {
  type: "text",
  tag: "input",
  fullWidth: true,
  placeholder: "",
  error: "",
  required: false
};

export default FormSection;
