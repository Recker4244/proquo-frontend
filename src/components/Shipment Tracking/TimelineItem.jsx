import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TrackingTimeline.module.css";

function TimelineItem({
  icon,
  title,
  date,
  isLast = false,
  isActive = false,
  isCompleted = false
}) {
  return (
    <div
      className={classNames(styles.timelineItem, {
        [styles.activeItem]: isActive,
        [styles.completedItem]: isCompleted && !isActive
      })}
    >
      <div className={styles.iconContainer}>
        {React.cloneElement(icon, {
          className: classNames({
            [styles.activeIcon]: isActive,
            [styles.completedIcon]: isCompleted && !isActive,
            [styles.inactiveIcon]: !isActive && !isCompleted
          })
        })}
        {!isLast && (
          <div
            className={classNames(styles.connector, {
              [styles.activeConnector]: isActive,
              [styles.completedConnector]: isCompleted && !isActive
            })}
          />
        )}
      </div>
      <div className={styles.timelineContent}>
        <h3
          className={classNames(styles.timelineTitle, {
            [styles.activeTitle]: isActive,
            [styles.completedTitle]: isCompleted && !isActive
          })}
        >
          {title}
        </h3>
        <p
          className={classNames(styles.timelineDate, {
            [styles.activeDate]: isActive,
            [styles.completedDate]: isCompleted && !isActive
          })}
        >
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
  isActive: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired
};

export default TimelineItem;
