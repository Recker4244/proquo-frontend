import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ProductTable.module.css";

function ProductTable({ poId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!poId) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please log in again.");
      setLoading(false);
      window.location.href = "/login";
      return;
    }
    fetch(`${apiUrl}/order/${poId}`, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status === 401) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          window.location.href = "/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
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
        setError("Could not load products.");
        setLoading(false);
      });
  }, [poId, apiUrl]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
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
  poId: PropTypes.string.isRequired
};

export default ProductTable;
