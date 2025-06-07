import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import styles from "./InputDesign.module.css";

function Cards({ summaryData }) {
  const navigate = useNavigate();
  const handleClick = (title) => {
    if (title === "Total RFQs Created") {
      navigate("/rfq");
    } else if (title === "Pending PO Approvals") {
      navigate("/rfqManage");
    } else if (title === "Active Orders") {
      navigate("/orders");
    } else if (title === "Orders Delivered") {
      navigate("/orders");
    } else if (title === "Active RFQs") {
      navigate("/rfq");
    }
  };

  const viewButtonTitles = new Set([
    "Pending PO Approvals",
    "Orders Delivered",
    "Pending Responses",
    "Potential Cost Savings"
  ]);

  return (
    <div className={styles.summaryGrid}>
      {summaryData.map((card) => (
        <article key={card.title} className={styles.summaryCard}>
          <div className={styles.cardIcon}>
            {card.icon}
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <div className={styles.numberContainer}>
              <p className={styles.cardValue}>{card.value}</p>
              <button
                type="button"
                onClick={() => handleClick(card.title)}
                className={
                  viewButtonTitles.has(card.title) ? styles.cardViewButton : styles.cardButton
                  }
                aria-label={viewButtonTitles.has(card.title) ? `View ${card.title}` : `Add new ${card.title}`}
              >
                {viewButtonTitles.has(card.title) ? (
                  "View"
                ) : (
                  <AddIcon />
                )}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

Cards.propTypes = {
  summaryData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.node.isRequired
    })
  ).isRequired
};

export default Cards;
