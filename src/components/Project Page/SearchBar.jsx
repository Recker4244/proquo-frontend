import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        Search
        <input
          type="text"
          id="searchInput"
          className={styles.searchInput}
          placeholder="Search for projects, companies, or people..."
        />
      </label>
    </div>
  );
};
export default SearchBar;
