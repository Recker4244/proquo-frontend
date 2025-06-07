import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#solutions", label: "Solutions" },
    { href: "#resources", label: "Resources" },
    { href: "#company", label: "Company" }
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1913e309e904b046b058bbec5c80c7807785bb758dcd3a1025de08bb89c0592?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678"
            alt="Proquo.tech Logo"
            className={styles.logo}
          />
          <h1 className={styles.brandName}>proquo.tech</h1>
        </div>
        {!isMobile && (
          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.authButtons}>
          <Link to="/login" className={styles.linkButton}>
            <button type="button" className={styles.signInButton}>
              Sign in
            </button>
          </Link>
          <Link to="/userRegistration" className={styles.linkButton}>
            <button type="button" className={styles.getStartedButton}>
              Get started
            </button>
          </Link>
          {isMobile && (
            <button
              type="button"
              className={styles.hamburgerMenu}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>
      </nav>
      {isMobile && (
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <ul className={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default NavBar;
