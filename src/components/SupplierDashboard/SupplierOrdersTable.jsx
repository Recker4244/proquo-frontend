import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SupplierOrdersTable.module.css";

function getLatestStatus(trackingEvents) {
  if (!trackingEvents || !trackingEvents.length) return "Unknown";
  const latest = [...trackingEvents].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )[0];
  return latest.status;
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "order shipped":
      return styles.statusShipped;
    case "in transit":
      return styles.statusTransit;
    case "order delivered":
      return styles.statusDelivered;
    case "accepted":
      return styles.statusAccepted;
    default:
      return styles.statusDefault;
  }
}

function SupplierOrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setNewStatus("");
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    setStatusUpdating(true);
    const token = localStorage.getItem("token");
    try {
      await fetch(`${apiUrl}/order/${selectedOrder.id}/status`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      setSelectedOrder(null);
      setStatusUpdating(false);
      window.location.reload();
    } catch {
      setStatusUpdating(false);
      alert("Failed to update order status.");
    }
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
  };

  if (!orders) return null;

  return (
    <div className={styles.ordersContainer}>
      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <p className={styles.emptyText}>No active orders</p>
          <p className={styles.emptySubtext}>Accepted orders will appear here</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Order ID</th>
                  <th className={styles.tableHeader}>Current Status</th>
                  <th className={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const status = getLatestStatus(order.tracking_events);
                  return (
                    <tr key={order.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <span className={styles.orderId}>
                          #
                          {order.po_id || order.id}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Order Details</h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleModalClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Order ID:</span>
                <span className={styles.detailValue}>
                  #
                  {selectedOrder.po_id || selectedOrder.id}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Current Status:</span>
                <span className={`${styles.statusBadge} ${getStatusColor(getLatestStatus(selectedOrder.tracking_events))}`}>
                  {getLatestStatus(selectedOrder.tracking_events)}
                </span>
              </div>

              <div className={styles.updateSection}>
                <label htmlFor="status" className={styles.updateLabel}>
                  Update Order Status:
                </label>
                <div className={styles.updateControls}>
                  <select
                    className={styles.statusDropdown}
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="">Select new status</option>
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Order Delivered">Order Delivered</option>
                  </select>
                  <button
                    type="button"
                    className={styles.updateButton}
                    onClick={handleUpdateStatus}
                    disabled={!newStatus || statusUpdating}
                  >
                    {statusUpdating ? (
                      <>
                        <div className={styles.spinner} />
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

SupplierOrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      po_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tracking_events: PropTypes.arrayOf(
        PropTypes.shape({
          status: PropTypes.string.isRequired,
          timestamp: PropTypes.string
        })
      )
    })
  ).isRequired
};

export default SupplierOrdersTable;
