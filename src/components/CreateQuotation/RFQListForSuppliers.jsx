import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import QuotationForm from "./QuotationForm";
import styles from "./RFQListForSuppliers.module.css";

function RFQListForSuppliers() {
  const token = localStorage.getItem("token");
  let companyType = null;
  if (token) {
    try {
      companyType = jwtDecode(token).company_type;
    } catch (e) {
      companyType = null;
    }
  }
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/rfq`, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Filter only submitted RFQs
        setRfqs(data.filter((rfq) => rfq.status === "Submitted"));
        setLoading(false);
      })
      .catch((err) => {
        setRfqs([]);
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading RFQs...</p>
      </div>
    );
  }
  console.log(rfqs);
  return (
    <div className={styles.rfqListPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Available RFQs</h1>
          <p className={styles.subtitle}>
            Browse and create quotations for specific items
          </p>
        </div>
        {companyType !== "Supplier" && (
          <div className={styles.infoMsg}>
            Only supplier companies can create quotations.
          </div>
        )}
        {rfqs.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3>No RFQs Available</h3>
            <p>No submitted RFQs available at the moment. Check back later!</p>
          </div>
        ) : (
          <div className={styles.rfqGrid}>
            {rfqs.map((rfq, index) => (
              <div
                key={rfq.id}
                className={styles.rfqCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.rfqTitle}>{rfq.title}</h3>
                    {(rfq.projectName || rfq.companyName) && (
                      <div className={styles.projectCompanyInfo}>
                        {rfq.projectName && (
                          <span className={styles.projectName}>{rfq.projectName}</span>
                        )}
                        {rfq.companyName && (
                          <>
                            <span className={styles.dotSeparator}>•</span>
                            <span className={styles.companyName}>{rfq.companyName}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.rfqDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Delivery Location:</span>
                    <span className={styles.value}>{rfq.deliveryLocation}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Preferred Date:</span>
                    <span className={styles.value}>
                      {new Date(rfq.preferredDeliveryDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

                <div className={styles.itemsSection}>
                  <h4 className={styles.itemsTitle}>Required Items</h4>
                  <div className={styles.itemsList}>
                    {rfq.items.map((item) => {
                      const isOpen = item.status === "Open";
                      return (
                        <button
                          type="button"
                          className={styles.itemCard}
                          onClick={() => companyType === "Supplier" && setSelectedItem({ ...item, rfq })}
                          disabled={companyType !== "Supplier"}
                          key={item.id}
                        >
                          <div className={styles.itemInfo}>
                            <span className={styles.itemType}>{item.type}</span>
                            <span className={styles.itemQuantity}>
                              {item.quantity}
                              {" "}
                              {item.unit}
                            </span>
                          </div>
                          <span
                            className={
                              isOpen ? styles.itemStatusOpen : styles.itemStatusClosed
                            }
                          >
                            {isOpen ? "Open" : "Closed"}
                          </span>
                          <button
                            type="button"
                            className={styles.quoteItemBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (companyType === "Supplier") setSelectedItem({ ...item, rfq });
                            }}
                            disabled={companyType !== "Supplier"}
                          >
                            Quote This Item
                          </button>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <QuotationForm
          item={selectedItem}
          rfq={selectedItem.rfq}
          onClose={() => setSelectedItem(null)}
          onSuccess={() => {
            setSelectedItem(null);
            setSuccessMsg("Quotation submitted successfully!");
            // Optionally refetch RFQs or show a success message
          }}
        />
      )}
      {successMsg && (
        <div className={styles.successModal}>
          <button
            className={styles.successCloseBtn}
            onClick={() => setSuccessMsg("")}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          <div className={styles.successContent}>
            <h4>Quotation Submitted!</h4>
            <p>
              Your quotation was submitted successfully.
              <br />
              If you want to create a new quotation for another item,
              just click &quot;Quote This Item&quot; again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RFQListForSuppliers;
