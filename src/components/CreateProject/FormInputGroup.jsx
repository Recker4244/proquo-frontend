"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./NewProjectForm.module.css";

function FormInputGroup({
  label, value, onChange, iconName, error
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
          className={styles.input}
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
  error: PropTypes.string.isRequired
};
FormInputGroup.defaultProps = {
  iconName: null
};
export default FormInputGroup;
