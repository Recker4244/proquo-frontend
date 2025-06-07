import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./QuotationForm.module.css";

function QuotationForm({
  item, rfq, onClose, onSuccess
}) {
  const [deliveryTimeWeeks, setDeliveryTimeWeeks] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Advanced");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  // Calculate total cost
  const totalCost = price ? (parseFloat(price) * item.quantity).toFixed(2) : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const quotationData = {
        rfqId: rfq.id,
        deliveryTimeWeeks: Number(deliveryTimeWeeks),
        paymentTerms,
        // Remove status - let backend handle it automatically
        quotationItems: [
          {
            rfqItemId: item.id,
            price: parseFloat(price),
            totalCost: parseFloat(totalCost)
          }
        ]
      };
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/quotation`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quotationData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create quotation");
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>×</button>
        <div className={styles.modalHeader}>
          <h3>Create Quotation</h3>
          <div className={styles.itemDetails}>
            <p>
              <strong>RFQ:</strong>
              {" "}
              {rfq.title}
            </p>
            <p>
              <strong>Item:</strong>
              {" "}
              {item.type}
              {" "}
              -
              {" "}
              {item.quantity}
              {" "}
              {item.unit}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Unit Price (₹)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={styles.input}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price per unit"
                  required
                />
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Total Cost (₹)
                <input
                  type="text"
                  className={`${styles.input} ${styles.readOnly}`}
                  value={totalCost}
                  readOnly
                  placeholder="Auto-calculated"
                />
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Delivery Time (weeks)
              <input
                type="number"
                min="1"
                className={styles.input}
                value={deliveryTimeWeeks}
                onChange={(e) => setDeliveryTimeWeeks(e.target.value)}
                placeholder="Number of weeks"
                required
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Payment Terms
              <select
                className={styles.select}
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                required
              >
                <option value="Advanced">Advanced Payment</option>
                <option value="Credit">Credit Payment</option>
              </select>
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Quotation"}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

QuotationForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
  }).isRequired,
  rfq: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default QuotationForm;
