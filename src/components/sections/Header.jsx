"use client";

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { jwtDecode } from "jwt-decode";
import styles from "./Header.module.css";

function Header({ hasSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    }
    if (userDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    return undefined;
  }, [userDropdown]);

  const handleUserIconClick = async () => {
    // Check for token and fetch user name
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { id } = jwtDecode(token);
        // Optionally fetch from API for latest name, else decode from token
        const res = await fetch(`${apiUrl}/user/${id}`, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setUserName(data.name || data.fullName || "User");
      } catch {
        setUserName("User");
      }
    } else {
      setUserName("User");
    }
    setUserDropdown((open) => !open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserDropdown(false);
    navigate("/login");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <header className={clsx(styles.header, {
        [styles.withSidebar]: hasSidebar
      })}
      >
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
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            </li>
            <li>
              <Link to="/projects" className={styles.navLink}>Projects</Link>
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

        <div className={styles.userControls} ref={dropdownRef}>
          <button type="button" className={styles.iconButton} aria-label="Settings">
            <SettingsIcon style={{ fontSize: 20 }} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Help">
            <HelpOutlineIcon style={{ fontSize: 20 }} />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="User menu"
            onClick={handleUserIconClick}
          >
            <AccountCircleIcon style={{ fontSize: 28 }} />
          </button>
          {userDropdown && (
            <div className={styles.userDropdown}>
              <div className={styles.userName}>{userName}</div>
              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>

        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton} aria-label="Menu">
          <i className={styles.menuIcon}>
            <MenuIcon style={{ fontSize: 20 }} />
          </i>
        </button>
      </header>
    </>
  );
}

Header.propTypes = {
  hasSidebar: PropTypes.bool.isRequired
};
export default Header;
