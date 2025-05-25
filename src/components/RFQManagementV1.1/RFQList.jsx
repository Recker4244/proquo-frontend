import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import StatusBadge from "../Orders and Tracking/StatusBadge";
import SearchBar from "../Orders and Tracking/SearchBar";
import styles from "./RFQList.module.css";

function RFQList() {
  const [rfqs, setRfqs] = React.useState([]);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    fetch(`${apiUrl}/rfq`)
      .then((response) => response.json())
      .then((data) => setRfqs(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredData = React.useMemo(() => {
    let data = rfqs;
    if (searchQuery.trim() !== "") {
      data = data.filter(
        (rfq) => Object.values(rfq).some(
          (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    return data;
  }, [searchQuery, rfqs]);
  const isoDate = "2025-06-01T17:19:34.468Z";
  const date = new Date(isoDate);

  const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const handleViewDetails = (rfqId) => {
    navigate('/compare', {
      state: {
        rfqId
      }
    });
  };
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
      <SearchBar placeholder="Search for projects, companies, or people..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table stickyHeader>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.headerCell}>RFQ Number</TableCell>
                <TableCell className={styles.headerCell}>Project Name</TableCell>
                <TableCell className={styles.headerCell}>Title</TableCell>
                <TableCell className={styles.headerCell}>Delivery Location</TableCell>
                <TableCell className={styles.headerCell}>Preferred Delivery Date</TableCell>
                <TableCell className={styles.headerCell}>Status</TableCell>
                <TableCell className={styles.headerCell}>Total Items</TableCell>
                <TableCell className={styles.headerCell}>Total Quotation</TableCell>
                <TableCell className={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {filteredData.length > 0 ? (
                filteredData.map((rfq) => (
                  <TableRow key={rfq.id} className={styles.tableRow}>
                    <TableCell className={styles.cell}>{rfq.id}</TableCell>
                    <TableCell className={styles.cell}>{rfq.projectName}</TableCell>
                    <TableCell className={styles.cell}>{rfq.title}</TableCell>
                    <TableCell className={styles.cell}>{rfq.deliveryLocation}</TableCell>
                    <TableCell className={styles.cell}>
                      {new Date(rfq.preferredDeliveryDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className={styles.cell}>
                      <StatusBadge status={rfq.status} />
                    </TableCell>
                    <TableCell className={styles.cell}>{rfq.totalItems}</TableCell>
                    <TableCell className={styles.cell}>{rfq.totalQuotations}</TableCell>
                    <TableCell className={styles.actionCell}>
                      <button
                        type="submit"
                        className={styles.detailsButton}
                        onClick={() => handleViewDetails(rfq.id)}
                      >
                        View Details
                      </button>
                    </TableCell>
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

export default RFQList;
