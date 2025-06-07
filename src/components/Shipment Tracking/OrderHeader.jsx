import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./OrderHeader.module.css";

function OrderHeader({ poId }) {
  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (poId) {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Session expired. Please log in again.");
        setLoading(false);
        navigate("/login");
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
            navigate("/login");
            return null;
          }
          if (!res.ok) throw new Error("Failed to fetch order details");
          return res.json();
        })
        .then((data) => {
          setPo(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Could not load order details.");
          setLoading(false);
        });
    }
  }, [poId, apiUrl, navigate]);

  if (loading) return <div>Loading order header...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!po) return <div className={styles.error}>Order not found.</div>;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Order #
        {po.po_id || po.id}
      </h2>
      <nav className={styles.tabsContainer}>
        <a href="#order" className={styles.tabItem}>
          Order Details
        </a>
        <a href="#shipment" className={styles.tabItem}>
          Shipment Details
        </a>
        <a href="#invoice" className={styles.tabItem}>
          Invoice Details
        </a>
      </nav>
    </section>
  );
}

OrderHeader.propTypes = {
  poId: PropTypes.string.isRequired
};

export default OrderHeader;
