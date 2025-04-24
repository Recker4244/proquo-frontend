import React from "react";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs() {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbsList}>
        <li>
          <a href="#orders" className={styles.breadcrumbLink}>
            Orders
          </a>
        </li>
        <li className={styles.separator}>/</li>
        <li>
          <span className={styles.currentPage}>PO 1234</span>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
