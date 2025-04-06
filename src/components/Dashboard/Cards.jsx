import React from "react";
import PropTypes from "prop-types";
import styles from "./InputDesign.module.css";

function Cards({ summaryData }) {
  return (
    <div className={styles.summaryGrid}>
      {summaryData.map((card) => (
        <article key={card.title} className={styles.summaryCard}>
          {card.icon}
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardValue}>{card.value}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
Cards.propTypes = {
  summaryData: PropTypes.isRequired
};
export default Cards;
