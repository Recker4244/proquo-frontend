import React, { useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import StatusBadge from "./StatusBadge";
import SearchBar from "./SearchBar";
import styles from "./PurchaseOrdersTable.module.css";

const PurchaseOrdersTable = () => {
  const orders = useMemo(() => [
    {
      id: "#1234", supplier: "UltraTech Ltd.", quantity: "3,000", value: "Rs.1,000,000", location: "Mumbai", status: "Accepted"
    },
    {
      id: "#1235", supplier: "Tata Steel", quantity: "5,000", value: "Rs.2,000,000", location: "Delhi", status: "Under Loading"
    },
    {
      id: "#1236", supplier: "Wienerberger", quantity: "8,000", value: "Rs.3,000,000", location: "Lucknow", status: "Dispatched"
    },
    {
      id: "#1237", supplier: "Greenply", quantity: "10,000", value: "Rs.4,000,000", location: "Bhubaneswar", status: "Delivered"
    },
    {
      id: "#1238", supplier: "Asian Paints", quantity: "12,000", value: "Rs.5,000,000", location: "Kolkata", status: "Overdue"
    },
    {
      id: "#1239", supplier: "Supreme", quantity: "15,000", value: "Rs.6,000,000", location: "Indore", status: "Due in 7 days"
    }
  ], []);

  const [activeFilters, setActiveFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = useMemo(() => [...new Set(orders.map((order) => order.status))], [orders]);

  const toggleFilter = (filter) => {
    setActiveFilter((prevFilter) => (
      prevFilter.includes(filter) ? prevFilter.filter((f) => f !== filter) : [filter]
    ));
  };

  const filteredData = useMemo(() => {
    let data = orders;

    // Apply status filter
    if (activeFilters.length > 0) {
      data = data.filter((order) => activeFilters.includes(order.status));
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      data = data.filter(
        (order) => Object.values(order).some(
          (value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return data;
  }, [activeFilters, searchQuery, orders]);

  return (
    <>
      {/* Search Bar */}
      <SearchBar placeholder="Search by PO number, supplier, or delivery location" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filter Buttons */}
      <div className={styles.filterContainer}>
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
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table stickyHeader>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.headerCell}>PO#</TableCell>
                <TableCell className={styles.headerCell}>Supplier</TableCell>
                <TableCell className={styles.headerCell}>Quantity</TableCell>
                <TableCell className={styles.headerCell}>Value</TableCell>
                <TableCell className={styles.headerCell}>Delivery Location</TableCell>
                <TableCell className={styles.headerCell}>Status</TableCell>
                <TableCell className={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {filteredData.length > 0 ? (
                filteredData.map((order) => (
                  <TableRow key={order.id} className={styles.tableRow}>
                    <TableCell className={styles.cell}>{order.id}</TableCell>
                    <TableCell className={styles.cell}>{order.supplier}</TableCell>
                    <TableCell className={styles.cell}>{order.quantity}</TableCell>
                    <TableCell className={styles.cell}>{order.value}</TableCell>
                    <TableCell className={styles.cell}>{order.location}</TableCell>
                    <TableCell className={styles.statusCell}>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className={styles.actionCell}>View Details</TableCell>
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
};

export default PurchaseOrdersTable;
