import React from "react";
import SearchBar from "./SearchBar";
import styles from "./SupplierComparison.module.css";

function FilterSection() {
  return (
    <section className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Filter &amp; Sort</h3>
      <div className={styles.filterTags}>
        <button type="button" className={styles.filterTag}>All Suppliers</button>
        <button type="button" className={styles.filterTag}>L1 Price</button>
        <button type="button" className={styles.filterTag}>L2 Price</button>
      </div>
      <SearchBar placeholder="Search by supplier name" />
      {/* <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchIconContainer}>
            <SearchOutlinedIcon />
          </div>
          <input
            type="text"
            placeholder="Search by supplier name"
            className={styles.searchInput}
          />
        </div>
      </div> */}
    </section>
  );
}
export default FilterSection;
