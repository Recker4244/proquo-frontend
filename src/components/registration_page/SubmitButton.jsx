"use client";

import React from "react";
import PropTypes from "prop-types";
import styles from "./SubmitButton.module.css";

const SubmitButton = ({ children }) => {
  return <button type="submit" className={styles.submitButton}>{children}</button>;
};
SubmitButton.propTypes = {
  children: PropTypes.node.isRequired
};
export default SubmitButton;
