import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroWrapper}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d629bd44bda6e6ecc4895df904dd383f893725610056437c9879fff16325646?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678"
            alt="Hero background"
            className={styles.heroBackground}
          />
          <div className={styles.contentContainer}>
            <div className={styles.heroText}>
              <h2 className={styles.heroTitle}>Cement procurement, reimagined</h2>
              <p className={styles.heroSubtitle}>
                Unlock the power of a modern procurement platform with Proquo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
