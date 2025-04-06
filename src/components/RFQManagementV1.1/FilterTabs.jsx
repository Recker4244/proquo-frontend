import React from "react";
import styles from "./FilterTabs.module.css";

function FilterTabs() {
  return (
    <div className={styles.filterContainer}>
      <button type="button" className={styles.filterTab}>All RFQs</button>
      <button type="button" className={styles.filterTab}>Active RFQs</button>
      <button type="button" className={styles.filterTab}>Draft RFQs</button>
      <button type="button" className={styles.filterTab}>Awaiting Responses</button>
      <button type="button" className={styles.filterTab}>Closed RFQs</button>
      <button type="button" className={styles.filterTab}>Upcoming RFQs</button>
      <button type="button" className={styles.filterTab}>Archived RFQs</button>
    </div>
  );
}

export default FilterTabs;
