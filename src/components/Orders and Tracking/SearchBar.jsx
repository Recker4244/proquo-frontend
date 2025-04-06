import React from "react";
import PropTypes from "prop-types";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from "./SearchBar.module.css";

const SearchBar = ({ placeholder, searchQuery, setSearchQuery }) => {
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired
};

export default SearchBar;
