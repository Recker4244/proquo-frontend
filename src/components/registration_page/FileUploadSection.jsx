"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./FileUploadSection.module.css";

const FileUploadSection = ({ iconUrl }) => {
  return (
    <section className={styles.uploadSection}>
      <div className={styles.uploadInfo}>
        <div className={styles.iconContainer}>
          <img src={iconUrl} alt="Upload icon" className={styles.icon} />
        </div>
        <p className={styles.uploadText}>Upload a document</p>
      </div>
      <div className={styles.selectFileContainer}>
        <button type="submit" className={styles.selectFileButton}>Select file</button>
      </div>
    </section>
  );
};
FileUploadSection.propTypes = {
  iconUrl: PropTypes.string.isRequired // Ensures iconUrl is a required string
};

export default FileUploadSection;
