import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import StatusBadge from "./StatusBadge";
import styles from "./RFQTable.module.css";

function RFQTable() {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <div className={styles.tableWrapper}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.headerCell}>Project</TableCell>
              <TableCell className={styles.headerCell}>Bid Due Date</TableCell>
              <TableCell className={styles.status}>Status</TableCell>
              <TableCell className={styles.headerCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {projects.map((project) => (
              <TableRow key={project.id} className={styles.tableRow}>
                <TableCell className={styles.cell}>{project.name}</TableCell>
                <TableCell className={styles.cell}>{project.dueDate}</TableCell>
                <TableCell className={styles.statusCell}>
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell className={styles.actionCell}>View</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default RFQTable;
