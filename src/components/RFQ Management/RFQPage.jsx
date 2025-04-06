"use client";

import React from "react";
import styles from "./RFQPage.module.css";
import Header from "../sections/Header";
import ProjectForm from "./ProjectForm";
import RFQForm from "./RFQForm";

function RFQPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.projectTitle}>
              Project: 123 Main St, San Francisco, CA
            </h1>
            <ProjectForm />
            <RFQForm />
          </div>
        </main>
      </div>
    </>
  );
}

export default RFQPage;
