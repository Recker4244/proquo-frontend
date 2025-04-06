import React from "react";
import styles from "./ProductTable.module.css";

const ProductTable = () => {
  const products = [
    {
      productName: "Premium Portland Cement",
      price: "Rs.12000/ton",
      quantity: "200 tons",
      total: "Rs.1,00,000"
    },
    {
      productName: "Reinforced Concrete",
      price: "Rs.6000/ton",
      quantity: "150 tons",
      total: "Rs.40,000"
    }
  ];
  return (
    <section className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Product</div>
        <div className={styles.headerCell}>Price</div>
        <div className={styles.headerCell}>Quantity</div>
        <div className={styles.headerCell}>Total</div>
      </div>

      {products.map((product) => (
        <div key={product} className={styles.tableRow}>
          <div className={styles.tableCell}>{product.productName}</div>
          <div className={styles.tableCell}>{product.price}</div>
          <div className={styles.tableCell}>{product.quantity}</div>
          <div className={styles.tableCell}>{product.total}</div>
        </div>
      ))}
    </section>
  );
};

export default ProductTable;
