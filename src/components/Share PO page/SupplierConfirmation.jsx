import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PurchaseOrderPage.module.css";

function getOrderTypeLabel(isFullOffer, items) {
  if (isFullOffer) return "(Full Offer)";
  if (items.length > 1) return "(Partial Offer)";
  return "(Single Item)";
}

function SupplierConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rfqId = state?.rfqId;
  let items = [];
  if (state?.items) {
    items = state.items;
  } else if (state?.itemType) {
    items = [{
      type: state.itemType,
      quantity: state.quantity,
      unit: state.unit,
      price: state.supplier?.price,
      totalCost: state.supplier?.totalCost,
      rfqItemId: state.supplier?.rfqItemId,
      deliveryTimeWeeks: state.supplier?.deliveryTimeWeeks,
      paymentTerms: state.supplier?.paymentTerms,
    }];
  }

  if (!state || !items.length || !state.supplier) {
    return (
      <div className={styles.error}>
        Invalid PO data. Please go back and select a supplier.
      </div>
    );
  }

  const { supplier, deliveryLocation, isFullOffer } = state;
  const grandTotal = items.reduce(
    (sum, item) => sum + (parseFloat(item.totalCost) || 0),
    0
  );

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch RFQ/project details if needed for the order
      const rfqRes = await fetch(`/rfq/rfq/${rfqId}`);
      if (!rfqRes.ok) throw new Error("Failed to fetch RFQ/project");
      const rfqData = await rfqRes.json();
      const { project } = rfqData;

      const typeOfItems = items.map((i) => i.type).join(", ");
      const dateOfGeneration = new Date().toISOString();

      const orderRes = await fetch("/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type_of_items: typeOfItems,
          date_of_generation: dateOfGeneration,
          delivery_address: deliveryLocation || rfqData.deliveryLocation,
          point_of_contact: project.siteInchargeName,
          point_of_contactphone: project.siteInchargeNumber,
          notes: rfqData.notes,
          terms_and_conditions: "",
          items: items.map((item) => ({
            description: item.type,
            quantity: item.quantity,
            unit_price: Number(item.price),
            quotation_item_id: item.quotationItemId,
            delivery_time_weeks: item.deliveryTimeWeeks,
            payment_terms: item.paymentTerms
          })),
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const orderData = await orderRes.json();
      await fetch(`/order/${orderData.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Order Placed",
          remarks: null
        }),
      }).catch((err) => {
        // Log error, but don't block user flow
        console.error("Failed to create tracking event:", err);
      });
      navigate("/orderSummary", {
        state: { poId: orderData.id }
      });
    } catch (err) {
      setError(err.message || "Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.poContainer}>
      <h2 className={styles.poTitle}>
        Purchase Order
        {getOrderTypeLabel(isFullOffer, items)}
      </h2>

      <div className={styles.supplierSection}>
        <div>
          <span className={styles.label}>Supplier:</span>
          <span className={styles.value}>{supplier.supplierName}</span>
        </div>
        <div>
          <span className={styles.label}>Delivery Location:</span>
          <span className={styles.value}>{deliveryLocation}</span>
        </div>
        <div>
          <span className={styles.label}>Payment Terms:</span>
          <span className={styles.value}>{supplier.paymentTerms}</span>
        </div>
        <div>
          <span className={styles.label}>Delivery Time:</span>
          <span className={styles.value}>
            {supplier.deliveryTimeWeeks}
            weeks
          </span>
        </div>
      </div>

      <div className={styles.itemsSection}>
        <h3 className={styles.itemsTitle}>Order Items</h3>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Material</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.rfqItemId || idx}>
                <td>{item.type}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>
                  Rs.
                  {item.price?.toLocaleString()}
                </td>
                <td>
                  Rs.
                  {item.totalCost?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>Grand Total:</span>
        <span className={styles.totalValue}>
          Rs.
          {grandTotal.toLocaleString()}
        </span>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Purchase Order"}
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SupplierConfirmation;
