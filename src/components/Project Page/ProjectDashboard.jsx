import React from "react";
import SearchBar from "./SearchBar";
import ProjectTable from "./ProjectTable";
import styles from "./ProjectDashboard.module.css";

function ProjectDashboard() {
  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Projects</h2>
          <button type="button" className={styles.addButton}>Add a new project</button>
        </div>
        <SearchBar />
        <ProjectTable />
      </div>
    </main>
  );
}

export default ProjectDashboard;
