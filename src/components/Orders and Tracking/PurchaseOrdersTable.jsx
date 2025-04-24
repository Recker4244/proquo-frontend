import React, { useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material"; 
import SearchBar from "./SearchBar";
import styles from "./PurchaseOrdersTable.module.css";

const PurchaseOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  React.useEffect(() => {
    fetch("/order")
      .then((response) => response.json())
      .then((data) => setOrders(data.rows))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  
  // const [activeFilters, setActiveFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // const filterOptions = useMemo(
  // () => [...new Set(orders.map((order) => order.status))], [orders]);

  // const toggleFilter = (filter) => {
  //   setActiveFilter((prevFilter) => (
  //     prevFilter.includes(filter) ? prevFilter.filter((f) => f !== filter) : [filter]
  //   ));
  // };

  const filteredData = useMemo(() => {
    let data = orders;

    // Apply status filter
    // if (activeFilters.length > 0) {
    //   data = data.filter((order) => activeFilters.includes(order.status));
    // }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      data = data.filter(
        (order) => Object.values(order).some(
          (value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return data;
  }, [searchQuery, orders]);

  return (
    <>
      {/* Search Bar */}
      <SearchBar placeholder="Search by PO number, supplier, or delivery location" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filter Buttons
      <div className={styles.filterContainer}>
        {filterOptions.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`${styles.filterTag} ${activeFilters.includes(filter) ? styles.active : ""}`}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table stickyHeader>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.headerCell}>PO#</TableCell>
                <TableCell className={styles.headerCell}>Type of Items</TableCell>
                <TableCell className={styles.headerCell}>Date of Generation</TableCell>
                <TableCell className={styles.headerCell}>Delivery Address</TableCell>
                <TableCell className={styles.headerCell}>Point of Contact</TableCell>
                <TableCell className={styles.headerCell}>Point of Contact Phone</TableCell>
                <TableCell className={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {filteredData.length > 0 ? (
                filteredData.map((order) => ( 
                  <TableRow key={order.id} className={styles.tableRow}>
                    <TableCell className={styles.cell}>{order.po_id}</TableCell>
                    <TableCell className={styles.cell}>{order.type_of_items}</TableCell>
                    <TableCell className={styles.cell}>
                      {new Date(order.date_of_generation).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className={styles.cell}>{order.delivery_address}</TableCell>
                    <TableCell className={styles.cell}>{order.point_of_contact}</TableCell>
                    <TableCell className={styles.cell}>{order.point_of_contactphone}</TableCell>
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
}

export default PurchaseOrdersTable;
