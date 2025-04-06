import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import StatusBadge from "../Orders and Tracking/StatusBadge";
import styles from "./RFQList.module.css";

function RFQList() {
  const rfqData = React.useMemo(() => [
    {
      id: "RFQ-2023-001",
      title: "Cement Supply for Greenview Project",
      supplier: "United Cement Corp.",
      status: "Active",
      deadline: "2024-03-15"
    },
    {
      id: "RFQ-2023-002",
      title: "Concrete Aggregates for Riverfront Construction",
      supplier: "Aggregate Solutions Inc.",
      status: "Awaiting Response",
      deadline: "2024-03-20"
    },
    {
      id: "RFQ-2023-003",
      title: "Mortar Mix for Willow Creek Development",
      supplier: "Mortar Solutions Ltd.",
      status: "Closed",
      deadline: "2024-03-05"
    },
    {
      id: "RFQ-2023-004",
      title: "Specialty Cement for Bridge Renovation",
      supplier: "Innovative Cements LLC",
      status: "Draft",
      deadline: "N/A"
    },
    {
      id: "RFQ-2023-005",
      title: "High-Strength Concrete for Skyrise Tower",
      supplier: "Alpha Concrete Inc.",
      status: "Active",
      deadline: "2024-03-22"
    },
    {
      id: "RFQ-2023-006",
      title: "Sustainable Cement Solutions",
      supplier: "EcoBuild Materials Co.",
      status: "Awaiting Response",
      deadline: "2024-03-25"
    },
    {
      id: "RFQ-2023-007",
      title: "Bulk Cement Order for Lakeside Residences",
      supplier: "United Cement Corp.",
      status: "Closed",
      deadline: "2024-03-10"
    },
    {
      id: "RFQ-2023-008",
      title: "Rapid-Setting Cement for Road Repairs",
      supplier: "QuickFix Cement Co.",
      status: "Active",
      deadline: "2024-03-18"
    },
    {
      id: "RFQ-2023-009",
      title: "White Cement for Architectural Projects",
      supplier: "WhiteStone Cement LLC",
      status: "Draft",
      deadline: "N/A"
    },
    {
      id: "RFQ-2023-010",
      title: "Ready-Mix Concrete for Small Projects",
      supplier: "MixReady Solutions",
      status: "Awaiting Response",
      deadline: "2024-03-28"
    }
  ], []);
  // const [activeFilters, setActiveFilter] = React.useState([]);
  // const filterOptions = React.useMemo(() => [...new Set(rfqData.map(
  //   (rfq) => rfq.status
  // ))], [rfqData]);
  // const toggleFilter = (filter) => {
  //   setActiveFilter((prevFilter) => (
  //     prevFilter.includes(filter)
  //       ? prevFilter.filter((f) => f !== filter)
  //       : [filter]
  //   ));
  // };
  // const filteredData = React.useMemo(() => {
  //   if (activeFilters.length === 0) return rfqData;
  //   return rfqData.filter((rfq) => activeFilters.includes(rfq.status));
  // }, [activeFilters, rfqData]);
  return (
    <>
      {/* <div className={styles.filterContainer}>
        {filterOptions.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`${styles.filterTag} ${activeFilters.includes(filter) ? styles.active : ''}`}
          >
            {filter}
          </button>
        ))}
      </div> */}
      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table stickyHeader>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.headerCell}>RFQ Number</TableCell>
                <TableCell className={styles.headerCell}>Title</TableCell>
                <TableCell className={styles.headerCell}>Supplier</TableCell>
                <TableCell className={styles.headerCell}>Status</TableCell>
                <TableCell className={styles.headerCell}>Deadline</TableCell>
                <TableCell className={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {rfqData.map((rfq) => (
                <TableRow key={rfq.id} className={styles.tableRow}>
                  <TableCell className={styles.cell}>{rfq.id}</TableCell>
                  <TableCell className={styles.cell}>{rfq.title}</TableCell>
                  <TableCell className={styles.cell}>{rfq.supplier}</TableCell>
                  <TableCell className={styles.cell}>
                    <StatusBadge status={rfq.status} />
                  </TableCell>
                  <TableCell className={styles.cell}>{rfq.deadline}</TableCell>
                  <TableCell className={styles.actionCell}>View Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default RFQList;
