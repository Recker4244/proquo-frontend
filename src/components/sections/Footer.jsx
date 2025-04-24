import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <nav className={styles.footerNav}>
            <a href="#privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
            <a href="#tos" className={styles.footerLink}>
              Terms of Service
            </a>
          </nav>
          <p className={styles.copyright}>2025 proquo.tech</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
