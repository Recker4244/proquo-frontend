import React from "react";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { PiRoadHorizon, PiPackage } from "react-icons/pi";
import TimelineItem from "./TimelineItem";
import styles from "./TrackingTimeline.module.css";

const TrackingTimeline = () => {
  const trackingSteps = [
    {
      icon: <DoneOutlinedIcon style={{ fontSize: "24px" }} />,
      title: "Order Placed",
      date: "July 20, 2024, 10:00 AM",
      isActive: true
    },
    {
      icon: <LocalShippingOutlinedIcon style={{ fontSize: "24px" }} />,
      title: "Order Shipped",
      date: "July 21, 2024, 2:00 PM",
      isActive: true
    },
    {
      icon: <PiRoadHorizon size={24} />,
      title: "In Transit",
      date: "July 22, 2024, 8:00 AM",
      isActive: true
    },
    {
      icon: <PiPackage size={24} />,
      title: "Delivered",
      date: "July 23, 2024, 12:00 PM",
      isActive: false,
      isLast: true
    }
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Shipment Tracking</h2>
      <div className={styles.timeline}>
        {trackingSteps.map((step, index) => (
          <TimelineItem
            key={step.title}
            icon={step.icon}
            title={step.title}
            date={step.date}
            isLast={step.isLast || index === trackingSteps.length - 1}
            isActive={step.isActive}
          />
        ))}
      </div>
    </section>
  );
};

export default TrackingTimeline;
