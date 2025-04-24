import React from "react";
import styles from "./LiveTrackingMap.module.css";

function LiveTrackingMap() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Live Tracking (Map)</h2>
      <div className={styles.mapContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/369e41a8032b77ec9f35c18553dea2066a6f9c14"
          alt="Map"
          className={styles.map}
        />
      </div>
    </section>
  );
}

export default LiveTrackingMap;
