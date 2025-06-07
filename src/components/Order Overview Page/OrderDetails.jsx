import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./OrderDetails.module.css";
import Header from "../sections/Header";
import OrderOverview from "./OrderOverview";
import ProductTable from "./ProductTable";
import ShipmentPaymentDetails from "./ShipmentPaymentDetails";

function OrderDetails() {
  const { state } = useLocation();
  const poId = state?.poId;
  const navigate = useNavigate();
  const [accessDenied, setAccessDenied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // New: State for order details and loading/error
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState("");

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.company_type !== "Supplier") {
        setAccessDenied(true);
      }
    } catch (e) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch order details for header
  useEffect(() => {
    if (!poId) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    setOrderLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/order/${poId}`, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setOrderLoading(false);
      })
      .catch(() => {
        setOrderError("Could not load order details.");
        setOrderLoading(false);
      });
  }, [poId]);

  const handleOrderAction = async (status) => {
    if (!poId) return;
    const token = localStorage.getItem("token");
    setActionLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/order/${poId}/status`,
        {
          method: "POST",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status,
            timestamp: new Date().toISOString()
          })
        }
      );
      if (res.ok) {
        setSuccessMessage(
          status === "Order Confirmed"
            ? "Order accepted successfully! Redirecting to dashboard..."
            : "Order rejected. Redirecting to dashboard..."
        );
        setTimeout(() => {
          navigate("/supplierDashboard");
        }, 2000);
      } else {
        alert("Failed to update order status.");
      }
    } catch (e) {
      alert("An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  if (accessDenied) {
    return <div className={styles.error}>Access denied: Suppliers only.</div>;
  }
  let orderNumberDisplay = "N/A";
  if (orderLoading) {
    orderNumberDisplay = "Loading...";
  } else if (orderError) {
    orderNumberDisplay = "N/A";
  } else if (order?.po_id || order?.id) {
    orderNumberDisplay = order.po_id || order.id;
  }
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <section className={styles.orderSection}>
            <h1 className={styles.orderTitle}>
              Order #
              {orderNumberDisplay}
            </h1>
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => handleOrderAction("Order Confirmed")}
                disabled={actionLoading || !!successMessage}
              >
                {actionLoading
                  ? "Processing..."
                  : "Approve Order"}
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => handleOrderAction("Order Rejected")}
                disabled={actionLoading || !!successMessage}
              >
                {actionLoading
                  ? "Processing..."
                  : "Reject Order"}
              </button>
            </div>
            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}
            <ProductTable poId={poId} />
            <ShipmentPaymentDetails poId={poId} />
          </section>
          <aside className={styles.sidebar}>
            <OrderOverview poId={poId} />
          </aside>
        </main>
      </div>
    </>
  );
}

export default OrderDetails;
