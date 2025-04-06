
import React from "react";
import styles from "./LandingPage.module.css";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Features from "./Features";
import Gallery from "./Gallery";

const LandingPage = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.landingPage}>
        <div className={styles.container}>
          <div className={styles.content}>
            <NavBar />
            <div className={styles.mainContent}>
              <div className={styles.contentWrapper}>
                <Hero />
                <Features />
                <Gallery />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
