"use client";

import React from "react";
import Header from "../sections/Header";
import ProjectDashboard from "./ProjectDashboard";
import styles from "./ProjectPage.module.css";

function ProjectPage() {
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

export default ProjectPage;
