import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1913e309e904b046b058bbec5c80c7807785bb758dcd3a1025de08bb89c0592?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678"
            alt="Logo"
            className={styles.logo}
          />
          <h1 className={styles.brandName}>proquo.tech</h1>
        </div>

        <div className={styles.navContent}>
          {!isMobile && (
            <ul className={styles.navLinks}>
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#solutions">Solutions</a>
              </li>
              <li>
                <a href="#resources">Resources</a>
              </li>
              <li>
                <a href="#company">Company</a>
              </li>
            </ul>
          )}
          <div className={styles.authButtons}>
            <button type="submit" className={styles.signInButton}>
              Sign in
            </button>
            <button type="submit" className={styles.getStartedButton}>
              Get started
            </button>
            {isMobile && (
              <button type="submit" className={styles.hamburgerMenu} onClick={toggleMenu}>
                <FiMenu size={24} />
              </button>
            )}
          </div>
        </div>
      </nav>
      {isMobile && isMenuOpen && (
        <ul className={styles.navLinks}>
          <li>
            <a href="#how-it-works">How it works</a>
          </li>
          <li>
            <a href="#solutions">Solutions</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
          <li>
            <a href="#company">Company</a>
          </li>
        </ul>
      )}
    </header>
  );
};
export default NavBar;
