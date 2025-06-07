import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import SearchBar from "./SearchBar";
import styles from "./PurchaseOrdersTable.module.css";

function PurchaseOrdersTable() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${apiUrl}/order`, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          return null;
        }
        return response.json();
      })
      .then((data) => setOrders(data.rows))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    let data = orders;
    if (searchQuery.trim() !== "") {
      data = data.filter(
        (order) => Object.values(order).some(
          (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    return data;
  }, [searchQuery, orders]);

  // Handler for View Details button click
  const handleViewDetails = (orderId) => {
    navigate("/track", { state: { orderId } });
  };

  return (
    <>
      <SearchBar
        placeholder="Search by PO number, supplier, or delivery location"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

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
                      {new Date(order.date_of_generation).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </TableCell>
                    <TableCell className={styles.cell}>{order.delivery_address}</TableCell>
                    <TableCell className={styles.cell}>{order.point_of_contact}</TableCell>
                    <TableCell className={styles.cell}>{order.point_of_contactphone}</TableCell>
                    <TableCell className={styles.actionCell}>
                      <button
                        type="button"
                        onClick={() => handleViewDetails(order.id)}
                        className={styles.viewDetailsButton}
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

export default PurchaseOrdersTable;
