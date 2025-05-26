import React from "react";
import styles from "./RFQOverview.module.css";
import Cards from "../Dashboard/Cards";

function RFQOverview() {
  const StatCard = [
    {
      title: "Active RFQs",
      value: 25
    },
    {
      title: "Pending Responses",
      value: 12
    },
    {
      title: "Potential Cost Savings",
      value: "$15,000"
    }
  ];
  return (
    <div className={styles.overviewContainer}>
      <div className={styles.cardRow}>
        <Cards summaryData={StatCard} />
      </div>
    </div>
  );
}

export default RFQOverview;
