import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Orders and Tracking/SearchBar";
import ProjectTable from "./ProjectTable";
import styles from "./ProjectDashboard.module.css";

function ProjectDashboard() {
  const navigate = useNavigate();
  const handleAddProject = () => {
    navigate("/createProject");
  };
  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Projects</h2>
          <button type="button" onClick={handleAddProject} className={styles.addButton}>Add a new project</button>
        </div>
        <ProjectTable />
      </div>
    </main>
  );
}

export default ProjectDashboard;
