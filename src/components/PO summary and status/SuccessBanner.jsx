import React from "react";
import styles from "./SuccessBanner.module.css";

const SuccessBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>You&apos;ve successfully shared your PO</h2>
        <p className={styles.description}>
          We&apos;re helping you build faster, smarter, and safer. Share the love by
          inviting your team to Proquo.
        </p>
      </div>
      <button type="submit" className={styles.inviteButton}>Invite team</button>
    </section>
  );
};

export default SuccessBanner;
