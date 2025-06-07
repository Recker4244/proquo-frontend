import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { PiRoadHorizon, PiPackage } from "react-icons/pi";
import CloseIcon from "@mui/icons-material/Close";
import TimelineItem from "./TimelineItem";
import styles from "./TrackingTimeline.module.css";

const STATUS_SEQUENCE = [
  "Order Placed",
  "Order Confirmed",
  "Order Shipped",
  "In Transit",
  "Order Delivered"
];

const statusIconMap = {
  "Order Placed": <DoneOutlinedIcon style={{ fontSize: "24px" }} />,
  "Order Confirmed": <DoneOutlinedIcon style={{ fontSize: "24px" }} />,
  "Order Shipped": <LocalShippingOutlinedIcon style={{ fontSize: "24px" }} />,
  "In Transit": <PiRoadHorizon size={24} />,
  "Order Delivered": <PiPackage size={24} />,
  "Order Rejected": <CloseIcon style={{ fontSize: "24px", color: "red" }} />
};

function formatDateTime(isoString) {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function TrackingTimeline({ orderId }) {
  if (!orderId) return null;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!orderId) return;
    fetch(`${apiUrl}/order/${orderId}/tracking`, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return res.json();
      })
      .then((fetchedEvents) => {
        const sorted = [...fetchedEvents].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setEvents(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tracking events:", err);
        setLoading(false);
      });
  }, [orderId, apiUrl]);

  if (loading) return <div>Loading shipment tracking...</div>;
  if (!events.length) return <div>No tracking events found.</div>;

  const isRejected = events.some((e) => e.status === "Order Rejected");

  let timelineSteps = STATUS_SEQUENCE.map((status, idx) => {
    const event = events.find((e) => e.status === status);
    return {
      status,
      icon: statusIconMap[status],
      date: event ? formatDateTime(event.timestamp) : null,
      idx
    };
  });

  if (isRejected) {
    const rejectedEvent = events.find((e) => e.status === "Order Rejected");
    const statusesToRemove = ["Order Confirmed", "Order Shipped", "In Transit", "Order Delivered"];
    timelineSteps = [
      ...timelineSteps.filter((step) => !statusesToRemove.includes(step.status)),
      {
        status: "Order Rejected",
        icon: statusIconMap["Order Rejected"],
        date: rejectedEvent ? formatDateTime(rejectedEvent.timestamp) : null,
        idx: timelineSteps.length
      }
    ];
  }

  const highestStatusIdx = Math.max(
    ...events.map((e) => timelineSteps.findIndex((step) => step.status === e.status)),
    -1
  );

  const timelineStepsWithActive = timelineSteps.map((step, idx) => ({
    ...step,
    isActive: idx === highestStatusIdx && highestStatusIdx !== -1,
    isCompleted: idx < highestStatusIdx && highestStatusIdx !== -1,
    isLast: idx === timelineSteps.length - 1
  }));

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Shipment Tracking</h2>
      <div className={styles.timeline}>
        {timelineStepsWithActive.map((step) => (
          <TimelineItem
            key={step.status}
            icon={step.icon}
            title={step.status}
            date={step.date}
            isLast={step.isLast}
            isActive={step.isActive}
            isCompleted={step.isCompleted}
          />
        ))}
      </div>
    </section>
  );
}

TrackingTimeline.propTypes = {
  orderId: PropTypes.string.isRequired
};

export default TrackingTimeline;
