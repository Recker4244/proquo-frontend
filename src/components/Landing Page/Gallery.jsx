import React from "react";
import styles from "./Gallery.module.css";

function Gallery() {
  const images = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/55eb3ef376b9a422b28be26fdf8d0d5d78d58aa8bac0473ef247e67dc21a6d0e?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      alt: "Gallery image 1"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/42407cb6be52fd82d6e4f3822061857e43724b00c958aec2566e2991308a64f3?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      alt: "Gallery image 2"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/920d247fa8556f8b62ca97fccd0063769b67e037948c3a0f0933a5962099343e?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      alt: "Gallery image 3"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c03d63609093c46f1d153faec99345b3fd7a4ae0aa35ea88c7179ebcbe871321?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678",
      alt: "Gallery image 4"
    }
  ];

  return (
    <section className={styles.gallery}>
      <div className={styles.imageGrid}>
        {images.map((image) => (
          <div key={image.id} className={styles.imageWrapper}>
            <img src={image.src} alt={image.alt} className={styles.image} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default Gallery;
