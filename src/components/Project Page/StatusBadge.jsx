import React from "react";
import PropTypes from "prop-types";
import styles from "./StatusBadge.module.css";

function StatusBadge({ status }) {
  return <span className={styles.badge}>{status}</span>;
}
StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};
export default StatusBadge;
