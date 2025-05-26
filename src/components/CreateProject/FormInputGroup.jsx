"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./NewProjectForm.module.css";

function FormInputGroup({
  label, value, onChange, iconName, error, disabled = false, placeholder
}) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={label} className={styles.inputLabel}>{label}</label>
      <div className={styles.inputWithIcon}>
        <input
          id={label}
          type="text"
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          disabled={disabled}
        />
        {iconName && (
          <div className={styles.iconWrapper}>
            {iconName}
          </div>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

FormInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  iconName: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
};

FormInputGroup.defaultProps = {
  iconName: null,
  error: null,
  disabled: false,
  placeholder: null
};

export default FormInputGroup;
