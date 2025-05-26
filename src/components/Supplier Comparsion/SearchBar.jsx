import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";
import styles from "./SupplierComparison.module.css";

function SearchBar({ placeholder }) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIconContainer}>
          <SearchOutlinedIcon />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired
};
export default SearchBar;
