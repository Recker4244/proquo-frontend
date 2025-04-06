"use client";

import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_114_6)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.6667 1.33333H10.2222V5.7778H5.7778V10.2222H1.33333V14.6667H14.6667V1.33333Z"
                  fill="#120D1C"
                />
              </g>
              <defs>
                <clipPath id="clip0_114_6">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1 className={styles.logoText}>proquo.tech</h1>
        </div>

        <nav className={styles.desktopNav}>
          <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ""}`}>
            <li>
              {/* <a href="/dashboard" className={styles.navLink}>
                Dashboard
              </a> */}
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            </li>
            <li>
              <Link to="/project" className={styles.navLink}>Projects</Link>
            </li>
            <li>
              <Link to="/invoice" className={styles.navLink}>Invoices</Link>
            </li>
            <li>
              <Link to="/payment" className={styles.navLink}>Payments</Link>
            </li>
            <li>
              <Link to="/shipping" className={styles.navLink}>Shipping</Link>
            </li>
            <li>
              <Link to="/suppliers" className={styles.navLink}>Suppliers</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.userControls}>
          <button type="button" className={styles.iconButton} aria-label="Settings">
            <SettingsIcon style={{ fontSize: 20 }} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Help">
            <HelpOutlineIcon style={{ fontSize: 20 }} />
          </button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2896d528807b8a444d15701d243772fe85c5ab0"
            alt="User profile"
            className={styles.userAvatar}
          />
        </div>

        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton} aria-label="Menu">
          <i className={styles.menuIcon}>
            <MenuIcon style={{ fontSize: 20 }} />
          </i>
        </button>
      </header>
    </>
  );
};

export default Header;
