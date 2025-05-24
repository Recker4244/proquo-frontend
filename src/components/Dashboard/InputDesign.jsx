"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Header from "../sections/Header";
import DashboardContent from "./DashboardContent";
import styles from "./InputDesign.module.css";

function InputDesign() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Header hasSidebar />
      <main className={styles.mainContainer}>
        <Sidebar />
        <section className={styles.contentWrapper}>
          <DashboardContent />
        </section>
      </main>
    </>
  );
}

export default InputDesign;
