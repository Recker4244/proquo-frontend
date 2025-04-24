import React from "react";
import PropTypes from "prop-types";
import styles from "./TrackingTimeline.module.css";

function TimelineItem({
  icon,
  title,
  date,
  isLast = false,
  isActive = false
}) {
  return (
    <div className={`${styles.timelineItem} ${isActive ? styles.activeItem : ""}`}>
      <div className={styles.iconContainer}>
        {React.cloneElement(icon, {
          className: isActive ? styles.activeIcon : styles.inactiveIcon
        })}
        {!isLast && (
        <div className={`${styles.connector} ${isActive ? styles.activeConnector : ""}`} />
        )}
      </div>
      <div className={styles.timelineContent}>
        <h3 className={`${styles.timelineTitle} ${isActive ? styles.activeTitle : ""}`}>
          {title}
        </h3>
        <p className={`${styles.timelineDate} ${isActive ? styles.activeDate : ""}`}>
          {date}
        </p>
      </div>
    </div>
  );
}

TimelineItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default TimelineItem;
