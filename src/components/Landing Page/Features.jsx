import React from "react";
import styles from "./Features.module.css";
import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3af0017208fb1df82a95281075486fcb864ed9e2ba31e7b254cca6c07d41a6c8?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      title: "Smart procurement matching",
      description: "We understand your project and match you with the right cement suppliers"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8e6e33d34f4bd4db7387978b0b7f785cf778ba18354c416068c45266a4be194d?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      title: "Real-time price comparison",
      description: "Our AI-powered algorithms help you find the best price for your project"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbe0c631cd7e20d41d263580e9f9e0866ee666ad90f36ea64c2d22a126949f1a?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      title: "Project-based procurement",
      description: "We break down your project into manageable chunks so you can easily manage your budget"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a765e5c6ae2988b18be8025d7fbd07948a4b5c8dc4d6ec0bb651d45d659ecfb?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      title: "Data-driven insights",
      description: "We provide you with the data you need to make informed decisions about your project"
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.title}>Key features</h2>
          <p className={styles.description}>
            Proquo is the first platform that allows you to manage your entire
            cement procurement process from start to finish
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
