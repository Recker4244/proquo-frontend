"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <section className={styles.progressContainer}>
      <header className={styles.stepIndicator}>
        Step
        {" "}
        {currentStep}
        {" "}
        of
        {" "}
        {totalSteps}

      </header>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </section>
  );
};
ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
};
export default ProgressBar;
