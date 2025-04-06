import React from "react";
import PropTypes from "prop-types";
import styles from "./StatCard.module.css";

const StatCard = ({ status }) => {
  return <span className={styles.badge}>{status}</span>;
};
StatCard.propTypes = {
  status: PropTypes.string.isRequired
};
export default StatCard;
