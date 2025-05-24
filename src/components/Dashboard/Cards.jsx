import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
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
          {card.icon}
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <div className={styles.numberContainer}>
              <p className={styles.cardValue}>{card.value}</p>
              <button 
                type="button"
                onClick={() => handleClick(card.title)}
                className={styles.cardButton}
              >
                {viewButtonTitles.has(card.title) ? (
                  <button
                    type="button"
                    onClick={() => handleClick(card.title)}
                    className={styles.cardViewButton}
                  >
                    View
                  </button>
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
  summaryData: PropTypes.isRequired
};
export default Cards;
