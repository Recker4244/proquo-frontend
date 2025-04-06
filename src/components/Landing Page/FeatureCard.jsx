import React from "react";
import PropTypes from 'prop-types';
import styles from "./FeatureCard.module.css";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <article className={styles.featureCard}>
      <div className={styles.iconContainer}>
        <img src={icon} alt={`${title} icon`} className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
};
FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
export default FeatureCard;
