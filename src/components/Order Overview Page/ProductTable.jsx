import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ProductTable.module.css";

function ProductTable({ poId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!poId) return;
    fetch(`${apiUrl}/order/${poId}`)
      .then((res) => res.json())
      .then((data) => {
        const allItems = (data.order_items || []).map((item) => ({
          id: item.id,
          productName: item.description,
          price: `Rs.${item.unit_price.toLocaleString()}/unit`,
          quantity: item.quantity,
          total: `Rs.${(item.unit_price * item.quantity).toLocaleString()}`
        }));
        setProducts(allItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [poId]);

  if (loading) return <div>Loading products...</div>;
  if (products.length === 0) return <div className={styles.error}>No products found.</div>;

  return (
    <section className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Product</div>
        <div className={styles.headerCell}>Price</div>
        <div className={styles.headerCell}>Quantity</div>
        <div className={styles.headerCell}>Total</div>
      </div>

      {products.map((product) => (
        <div key={product.id} className={styles.tableRow}>
          <div className={styles.tableCell}>{product.productName}</div>
          <div className={styles.tableCell}>{product.price}</div>
          <div className={styles.tableCell}>{product.quantity}</div>
          <div className={styles.tableCell}>{product.total}</div>
        </div>
      ))}
    </section>
  );
}

ProductTable.propTypes = {
  poId: PropTypes.string.isRequired,
};

export default ProductTable;
