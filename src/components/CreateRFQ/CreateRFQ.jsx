"use client";

import React from "react";
import Header from "../sections/Header";
import ProjectDashboard from "./RFQDashboard";
import styles from "./CreateRFQ.module.css";

function CreateRFQ() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.container}>
        <Header />
        <ProjectDashboard />
      </div>
    </>
  );
}

export default CreateRFQ;
