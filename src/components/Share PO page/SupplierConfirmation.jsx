"use client";

import React from "react";
import styles from "./PurchaseOrderPage.module.css";

const SupplierConfirmation = () => {
  const supply = {
    supplierName: "Bauer Construction",
    supplierAddress: "1234 5th St, San Francisco, CA 94107",
    orderValue: "25,000.00",
    downPayment: "5000.00",
    balanceDue: "20000.00",
    firstMilestoneValue: "10,000.00",
    secondMilestoneValue: "10,000.00",
    deliveryAddress: "45, Main Street, Delhi - 110001, India"
  };
  return (
    <section className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.pageTitle}>
          Confirm Supplier & Send Purchase Order
        </h2>
        <div className={styles.supplierSection}>
          <div className={styles.supplierInfo}>
            <div className={styles.supplierDetails}>
              <p className={styles.label}>Supplier</p>
              <h3 className={styles.supplierName}>{supply.supplierName}</h3>
              <p className={styles.supplierAddress}>
                {supply.supplierAddress}
              </p>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/029f9a660f99095bdae86fe70354e1ec2cac4a23"
              alt="Supplier location"
              className={styles.supplierImage}
            />
          </div>
        </div>

        <section className={styles.pricingSection}>
          <h3 className={styles.sectionTitle}>Quoted Price</h3>

          <div className={styles.priceRow}>
            <div className={styles.priceInfo}>
              <h4 className={styles.priceLabel}>Total Order Value</h4>
              <p className={styles.priceValue}>{supply.orderValue}</p>
            </div>
            <p className={styles.priceDescription}>Value of the order</p>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.priceInfo}>
              <h4 className={styles.priceLabel}>Down Payment</h4>
              <p className={styles.priceValue}>{supply.downPayment}</p>
            </div>
            <p className={styles.priceDescription}>Value Amount</p>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.priceInfo}>
              <h4 className={styles.priceLabel}>Balance Due</h4>
              <p className={styles.priceValue}>{supply.balanceDue}</p>
            </div>
            <p className={styles.priceDescription}>Pay Now</p>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.priceInfo}>
              <h4 className={styles.priceLabel}>First Milestone</h4>
              <p className={styles.priceValue}>{supply.firstMilestoneValue}</p>
            </div>
            <p className={styles.priceDescription}>Value Description</p>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.priceInfo}>
              <h4 className={styles.priceLabel}>Second Milestone</h4>
              <p className={styles.priceValue}>{supply.secondMilestoneValue}</p>
            </div>
            <p className={styles.priceDescription}>Value Description</p>
          </div>

          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>Payment Terms</p>
            <p className={styles.infoValue}>Advanced</p>
          </div>

          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>Delivery Details</p>
            <p className={styles.infoValue}>
              {supply.deliveryAddress}
            </p>
          </div>
        </section>

        <div className={styles.actionButtons}>
          <button type="button" className={styles.sendButton}>Send PO</button>
          <button type="button" className={styles.reviewButton}>Review PO</button>
        </div>
        <button type="button" className={styles.cancelButton}>Cancel</button>
      </div>
    </section>
  );
};

export default SupplierConfirmation;
