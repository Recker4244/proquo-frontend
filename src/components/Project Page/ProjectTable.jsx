import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import StatusBadge from "./StatusBadge";
import SearchBar from "../Orders and Tracking/SearchBar";
import styles from "./ProjectTable.module.css";

function ProjectTable() {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    fetch("project")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredData = React.useMemo(() => {
    let data = projects;
    if (searchQuery.trim() !== "") {
      data = data.filter(
        (project) => Object.values(project).some(
          (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    return data;
  }, [searchQuery, projects]);
  
  return (
    <>
      <SearchBar placeholder="Search for projects, companies, or people..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table stickyHeader className={styles.table}>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.headerCell}>Project Name</TableCell>
                <TableCell className={styles.headerCell}>Project Location</TableCell>
                <TableCell className={styles.headerCell}>Site In Charge Name</TableCell>
                <TableCell className={styles.headerCell}>Site In Charge Number</TableCell>
                <TableCell className={styles.headerCell}>Project Type</TableCell>
                <TableCell className={styles.headerCell}>Work Type</TableCell>
                <TableCell className={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {filteredData.length > 0 ? (
                filteredData.map((project) => (
                  <TableRow key={project.id} className={styles.tableRow}>
                    <TableCell className={styles.cell}>{project.project_name}</TableCell>
                    <TableCell className={styles.cell}>{project.project_location}</TableCell>
                    <TableCell className={styles.cell}>{project.siteInchargeName}</TableCell>
                    <TableCell className={styles.cell}>{project.siteInchargeNumber}</TableCell>
                    <TableCell className={styles.cell}>{project.project_type}</TableCell>
                    <TableCell className={styles.cell}>{project.workType}</TableCell>
                    <TableCell className={styles.actionCell}>View</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="7" className="text-center p-4 text-gray-500">
                    No matching results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ProjectTable;
