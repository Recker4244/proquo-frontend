import React from "react";
import styles from "./ContactSupport.module.css";

function ContactSupport() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Contact Support</h2>
      <p className={styles.description}>
        If you have any questions or concerns regarding the shipment, please
        contact our support team.
      </p>
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.button}>Contact Support</button>
      </div>
    </section>
  );
}

export default ContactSupport;
