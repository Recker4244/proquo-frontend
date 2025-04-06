import React from "react";
import SummaryCards from "./SummaryCards";
import ProjectsTable from "./ProjectsTable";
import RFQTable from "./RFQTable";
import styles from "./InputDesign.module.css";

function DashboardContent() {
  return (
    <div className={styles.dashboardContent}>
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome to Proquo, Roshan</h1>
        <p className={styles.notificationText}>You have 2 notifications</p>
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
        <ProjectsTable />
      </section>

      <section className={styles.rfqSection}>
        <h2 className={styles.sectionTitle}>RFQ Status</h2>
        <RFQTable />
      </section>
    </div>
  );
}

export default DashboardContent;
