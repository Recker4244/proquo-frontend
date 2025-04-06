"use client";

import React from "react";
import Header from "../sections/Header";
import OrderHeader from "./OrderHeader";
import TrackingTimeline from "./TrackingTimeline";
import SupplierInfo from "./SupplierInfo";
import LiveTrackingMap from "./LiveTrackingMap";
import ShipmentDetails from "./ShipmentDetails";
import ContactSupport from "./ContactSupport";
import styles from "./OrderTrackingPage.module.css";

const OrderTrackingPage = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <Header />
        <section className={styles.content}>
          <div className={styles.contentWrapper}>
            <OrderHeader />
            <TrackingTimeline />
            <SupplierInfo />
            <LiveTrackingMap />
            <ShipmentDetails />
            <ContactSupport />
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderTrackingPage;
