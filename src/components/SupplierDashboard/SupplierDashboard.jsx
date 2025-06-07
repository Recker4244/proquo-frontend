import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SupplierOrdersTable from "./SupplierOrdersTable";
import styles from "./SupplierDashboard.module.css";

function SupplierDashboard() {
  const [rfqs, setRfqs] = useState([]);
  const [toBeAccepted, setToBeAccepted] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

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
        return;
      }
    } catch (e) {
      navigate("/login");
      return;
    }
    setLoading(true);
    Promise.all([
      fetch(`${apiUrl}/rfq`, {
        headers: { "x-auth-token": token, "Content-Type": "application/json" }
      }).then((res) => res.json()),
      fetch(`${apiUrl}/order`, {
        headers: { "x-auth-token": token, "Content-Type": "application/json" }
      }).then((res) => res.json())
    ])
      .then(([rfqsData, ordersData]) => {
        setRfqs(rfqsData.rows || rfqsData);
        setToBeAccepted(ordersData.toBeAccepted || []);
        setAccepted(ordersData.accepted || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, [apiUrl, navigate]);

  if (accessDenied) {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🚫</div>
          <h2 className={styles.errorTitle}>Access Denied</h2>
          <p className={styles.errorMessage}>This dashboard is only accessible to suppliers.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.dashboardWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Supplier Dashboard</h1>
          <p className={styles.subtitle}>
            Manage your RFQs, quotations, and orders from one place
          </p>
        </div>

        <div className={styles.sectionsGrid}>
          {/* Available RFQs Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Available RFQs</h2>
              <span className={styles.badge}>{rfqs.length}</span>
            </div>
            <div className={styles.sectionContent}>
              {rfqs.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📋</div>
                  <p className={styles.emptyText}>No RFQs available at the moment</p>
                  <p className={styles.emptySubtext}>New opportunities will appear here</p>
                </div>
              ) : (
                <div className={styles.cardGrid}>
                  {rfqs.map((rfq) => (
                    <div key={rfq.id} className={styles.card}>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{rfq.title}</h3>
                        <p className={styles.cardMeta}>
                          RFQ ID:
                          {" "}
                          {rfq.id}
                        </p>
                      </div>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={() => navigate("/createQuotation", { state: { rfqId: rfq.id } })}
                      >
                        View & Quote
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Orders To Be Accepted Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Pending Orders</h2>
              <span className={styles.badge}>{toBeAccepted.length}</span>
            </div>
            <div className={styles.sectionContent}>
              {toBeAccepted.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📦</div>
                  <p className={styles.emptyText}>No pending orders</p>
                  <p className={styles.emptySubtext}>New orders will appear here for acceptance</p>
                </div>
              ) : (
                <div className={styles.cardGrid}>
                  {toBeAccepted.map((order) => (
                    <div key={order.id} className={styles.card}>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>
                          Order #
                          {order.po_id || order.id}
                        </h3>
                      </div>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => navigate("/overview", { state: { poId: order.id } })}
                      >
                        Review Order
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Accepted Orders Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Active Orders</h2>
              <span className={styles.badge}>{accepted.length}</span>
            </div>
            <div className={styles.sectionContent}>
              <SupplierOrdersTable orders={accepted} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default SupplierDashboard;
