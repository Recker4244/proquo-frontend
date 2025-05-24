import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./OrderOverview.module.css";

// Helper to format date as "Jul 1, 2025"
function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Helper to get the latest expected delivery date from all items
function getExpectedDelivery(order) {
  if (!order?.date_of_generation || !order?.order_items?.length) return "-";
  // Calculate delivery date for each item, return the latest
  const dates = order.order_items
    .map((item) => {
      if (typeof item.delivery_time_weeks !== "number") return null;
      const d = new Date(order.date_of_generation);
      d.setDate(d.getDate() + item.delivery_time_weeks * 7);
      return d;
    })
    .filter(Boolean);
  if (!dates.length) return "-";
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  return formatDate(latest);
}

// Helper to get supplier name(s)
function getSupplierNames(order) {
  if (!order?.order_items?.length) return "-";
  const names = order.order_items
    .map(
      (item) => item.quotationItem?.quotation?.supplierName
        || item.supplierName
        || "-"
    )
    .filter((name, idx, arr) => name !== "-" && arr.indexOf(name) === idx);
  if (names.length === 0) return "-";
  if (names.length === 1) return names[0];
  return names.join(", ");
}

function OrderOverview({ poId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!poId) return;
    fetch(`/order/${poId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [poId]);

  if (loading) return <aside className={styles.container}>Loading...</aside>;
  if (!order) return <aside className={styles.container}>Order not found.</aside>;

  const orderDate = formatDate(order.date_of_generation);
  const expectedDelivery = getExpectedDelivery(order);
  const supplier = getSupplierNames(order);
  // Status and shipment progress are placeholders; adjust as needed
  const status = order.status || "In Transit";
  const shipmentProgress = order.shipmentProgress || "60%";

  return (
    <aside className={styles.container}>
      <h2 className={styles.title}>Order Overview</h2>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Order Date</span>
          <span className={styles.value}>{orderDate}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Expected Delivery</span>
          <span className={styles.value}>{expectedDelivery}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Supplier</span>
          <span className={styles.value}>{supplier}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Status</span>
          <span className={styles.value}>{status}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionButton}>View Shipment Details</button>
        <button type="button" className={styles.actionButton}>Contact Supplier</button>
      </div>
    </aside>
  );
}

OrderOverview.propTypes = {
  poId: PropTypes.string.isRequired,
};

export default OrderOverview;
