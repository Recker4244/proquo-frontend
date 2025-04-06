import React from "react";
import PropTypes from "prop-types";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${Number(progress)}%` }} />
    </div>
  );
};
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
};
export default ProgressBar;
