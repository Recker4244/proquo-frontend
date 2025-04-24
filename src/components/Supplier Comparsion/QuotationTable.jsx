import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import styles from "./SupplierComparison.module.css";

function QuotationTable() {
  const suppliers = [
    {
      name: "Ultratech", price: "Rs.450,000", totalCost: "Rs.450,000", deliveryTime: "20 weeks", paymentTerms: "Advanced", ranking: "L1"
    },
    {
      name: "Nuvoco", price: "Rs.520,000", totalCost: "Rs.520,000", deliveryTime: "28 weeks", paymentTerms: "Advanced", ranking: "L3"
    },
    {
      name: "Dalmia", price: "Rs.470,000", totalCost: "Rs.470,000", deliveryTime: "22 weeks", paymentTerms: "Advanced", ranking: "L2"
    }
  ];
  return (
    <div className={styles.tableWrapper}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.headerCell}>Supplier</TableCell>
              <TableCell className={styles.headerCell}>Price</TableCell>
              <TableCell className={styles.headerCell}>Total Cost</TableCell>
              <TableCell className={styles.headerCell}>Delivery Time</TableCell>
              <TableCell className={styles.headerCell}>Payment Terms</TableCell>
              <TableCell className={styles.headerCell}>Ranking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {suppliers.map((supplier) => (
              <TableRow key={supplier} className={styles.tableRow}>
                <TableCell className={`${styles.supplierName} ${styles.cell}`}>{supplier.name}</TableCell>
                <TableCell className={styles.cell}>{supplier.price}</TableCell>
                <TableCell className={styles.cell}>{supplier.totalCost}</TableCell>
                <TableCell className={styles.cell}>{supplier.deliveryTime}</TableCell>
                <TableCell className={styles.cell}>{supplier.paymentTerms}</TableCell>
                <TableCell className={styles.cell}>
                  <span className={styles.ranking}>
                    {supplier.ranking}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>

  );
}
export default QuotationTable;
