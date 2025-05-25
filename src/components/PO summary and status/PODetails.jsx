import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PODetails.module.css";

function PODetails({ poId }) {
  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (poId) {
      fetch(`${apiUrl}/order/${poId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch PO details");
          return res.json();
        })
        .then((data) => {
          setPo(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Could not load PO details.");
          setLoading(false);
        });
    }
  }, [poId]);

  if (loading) return <div>Loading PO details...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!po) return <div className={styles.error}>PO not found.</div>;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Purchase Order Details</h2>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>PO Number</h3>
            <p className={styles.value}>{po.po_id || po.id}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Point of Contact</h3>
            <p className={styles.value}>{po.point_of_contact || "-"}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>Contact Phone</h3>
            <p className={styles.value}>{po.point_of_contactphone || "-"}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Delivery Address</h3>
            <p className={styles.value}>{po.delivery_address || "-"}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>Notes</h3>
            <p className={styles.value}>{po.notes || "-"}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Terms & Conditions</h3>
            <p className={styles.value}>{po.terms_and_conditions || "-"}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <h3 className={styles.label}>Type of Items</h3>
            <p className={styles.value}>{po.type_of_items || "-"}</p>
          </div>
          <div className={styles.field}>
            <h3 className={styles.label}>Date of Generation</h3>
            <p className={styles.value}>
              {po.date_of_generation
                ? new Date(po.date_of_generation).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.trackButton}
          onClick={() => navigate("/track", { state: { poId } })}
        >
          Track PO
        </button>
        <button
          type="button"
          className={styles.supplierButton}
          onClick={() => navigate("/overview", { state: { poId } })}
        >
          View Supplier Status
        </button>
        <button type="button" onClick={() => navigate("/dashboard")} className={styles.dashboardButton}>Go to Dashboard</button>
      </div>
      <p className={styles.downloadText}>Or download your purchase order PDF</p>
    </section>
  );
}

PODetails.propTypes = {
  poId: PropTypes.string.isRequired,
};

export default PODetails;
