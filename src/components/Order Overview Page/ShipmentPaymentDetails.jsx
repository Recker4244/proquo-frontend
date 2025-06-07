import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ShipmentPaymentDetails.module.css";

// Add weeks to a date string and format as 'Jul 1, 2025'
function addWeeksAndFormat(dateString, weeks) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime()) || typeof weeks !== "number") return "-";
  date.setDate(date.getDate() + weeks * 7);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Format a date string as 'Jul 1, 2025'
function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function ShipmentPaymentDetails({ poId }) {
  const [order, setOrder] = useState(null);
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
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setError("Could not load shipment/payment details.");
        setLoading(false);
      });
  }, [poId, apiUrl]);

  if (loading) return <div>Loading shipment and payment details...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!order) return <div className={styles.error}>Order not found.</div>;

  // Fallbacks for missing fields
  const address = order.delivery_address || "-";
  const invoiceDate = order.date_of_generation
    ? formatDate(order.date_of_generation)
    : "-";

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping Details</h2>
        <div className={styles.detailsContent}>
          {order.order_items && order.order_items.length > 0 ? (
            order.order_items.map((item) => (
              <div key={item.id} className={styles.detailRow}>
                <span className={styles.label}>
                  Delivery Date for
                  {" "}
                  {item.description}
                </span>
                <span className={styles.value}>
                  {(order.date_of_generation && typeof item.delivery_time_weeks === "number")
                    ? addWeeksAndFormat(order.date_of_generation, item.delivery_time_weeks)
                    : "-"}
                  {" "}
                  {typeof item.delivery_time_weeks === "number"
                    ? `(in ${item.delivery_time_weeks} week${item.delivery_time_weeks !== 1 ? "s" : ""})`
                    : ""}
                </span>
              </div>
            ))
          ) : (
            <div className={styles.detailRow}>
              <span className={styles.label}>Delivery Date</span>
              <span className={styles.value}>-</span>
            </div>
          )}
          <div className={styles.detailRow}>
            <span className={styles.label}>Address</span>
            <span className={styles.value}>{address}</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment Details</h2>
        <div className={styles.detailsContent}>
          {(() => {
            // Gather all payment terms (replace null/undefined with "-")
            const terms = (order.order_items || []).map(
              (item) => item.paymentTerms || "-"
            );
            const uniqueTerms = Array.from(new Set(terms));
            if (uniqueTerms.length === 1) {
              return (
                <div className={styles.detailRow}>
                  <span className={styles.label}>Payment Terms</span>
                  <span className={styles.value}>{uniqueTerms[0]}</span>
                </div>
              );
            }
            return order.order_items.map((item) => (
              <div key={item.id} className={styles.detailRow}>
                <span className={styles.label}>
                  Payment Terms for
                  {item.description}
                </span>
                <span className={styles.value}>
                  {item.paymentTerms ? item.paymentTerms : "-"}
                </span>
              </div>
            ));
          })()}
          <div className={styles.detailRow}>
            <span className={styles.label}>Invoice Date</span>
            <span className={styles.value}>{invoiceDate}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

ShipmentPaymentDetails.propTypes = {
  poId: PropTypes.string.isRequired
};

export default ShipmentPaymentDetails;
