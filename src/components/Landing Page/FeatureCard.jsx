import React from "react";
import PropTypes from "prop-types";
import styles from "./FeatureCard.module.css";

function FeatureCard({
  icon, title, description, index
}) {
  return (
    <article
      className={styles.featureCard}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.iconContainer}>
        <img
          src={icon}
          alt={`${title} icon`}
          className={styles.icon}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default FeatureCard;
