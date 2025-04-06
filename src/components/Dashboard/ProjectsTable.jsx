import React from "react";
import styles from "./InputDesign.module.css";

const projectsData = [
  {
    name: "Office Renovation",
    status: "In Progress",
    progress: 45,
    cost: "Rs.12,000"
  },
  {
    name: "New Laptop Purchase",
    status: "Approved",
    progress: 100,
    cost: "Rs.20,000"
  },
  {
    name: "Employee Wellness Program",
    status: "Pending Approval",
    progress: 0,
    cost: "Rs.5,000"
  },
  {
    name: "Customer Service Training",
    status: "Completed",
    progress: 100,
    cost: "Rs.15,000"
  },
  {
    name: "Sustainability Initiative",
    status: "In Progress",
    progress: 60,
    cost: "Rs.8,000"
  }
];

function ProjectsTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.projectsTable}>
        <thead>
          <tr>
            <th>Projects</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectsData.map((project) => (
            <tr key={project.name}>
              <td>{project.name}</td>
              <td>
                <span className={styles.statusBadge}>{project.status}</span>
              </td>
              <td>
                <div className={styles.progressWrapper}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span>{project.progress}</span>
                </div>
              </td>
              <td>{project.cost}</td>
              <td>
                <button type="button" className={styles.viewDetailsButton}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;
