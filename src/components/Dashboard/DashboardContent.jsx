import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SummaryCards from "./SummaryCards";
import ProjectTable from "../Project Page/ProjectTable";
import RFQList from "../RFQManagementV1.1/RFQList";
import PurchaseOrdersTable from "../Orders and Tracking/PurchaseOrdersTable";
import styles from "./InputDesign.module.css";

function DashboardContent() {
  const [userName, setUserName] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { id } = jwtDecode(token);
        fetch(`${apiUrl}/user/${id}`, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setUserName(data.name || data.fullName || "User");
          })
          .catch(() => setUserName("User"));
      } catch {
        setUserName("User");
      }
    }
  }, [apiUrl]);
  return (
    <div className={styles.dashboardContent}>
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome to Proquo,
          {" "}
          {userName}
        </h1>
      </section>

      <nav className={styles.tabNav}>
        <a href="#home" className={styles.tabActive}>Home</a>
        <a href="#reports" className={styles.tabLink}>Reports</a>
        <a href="#orders" className={styles.tabLink}>Orders</a>
        <a href="#suppliers" className={styles.tabLink}>Suppliers</a>
        <a href="#catalog" className={styles.tabLink}>Catalog</a>
        <a href="#inventory" className={styles.tabLink}>Inventory</a>
      </nav>

      <section className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <SummaryCards />
      </section>

      <section className={styles.projectsSection}>
        <h2 className={styles.sectionTitle}>Ongoing Projects</h2>
        <ProjectTable />
      </section>

      <section className={styles.rfqSection}>
        <h2 className={styles.sectionTitle}>RFQs Created</h2>
        <RFQList />
      </section>

      <section className={styles.rfqSection}>
        <h2 className={styles.sectionTitle}>Orders</h2>
        <PurchaseOrdersTable />
      </section>
    </div>
  );
}

export default DashboardContent;
